---
lastUpdated: true
title: Iframe bridge
layout: doc
---

# {{ $frontmatter.title }} (<span style="color: ff471e">Internal Use Only</span>)

对于 Tezign 内部的定开团队，可能会用到 DAM App 的一些内部函数，比如说 路由跳转，http的实例，当前 URL等等。由于跨域的限制，我们无法直接在 iframe 中调用 DAM 的 `window` 对象，更别说调用方法的结果 因此我们需要通过 `iframe bridge` 来实现: 


## Event Interface
::: code-group
```ts [host.ts]
window.addEventListener('message', (e: MessageEvent<InvokeFunction | EvalScript>) => void)

interface InvokeFunction {
  event: 'invoke-function',
  data: {
    functionPath: string;
    paramArray: any | any[];
    requestId?: number | string;
  },
  from?: string;
}

interface EvalScript {
  event: 'eval-script',
  data: {
    code: string;
    requestId?: number | string;
  };
  from?: string;
}
```

```ts [iframe.ts]
window.addEventListener('message', (e: MessageEvent<InvokeFunctionResult | EvalScriptResult>) => void)

type Result = {value: any} | {error: Error}

interface InvokeFunctionResult {
  event: 'invoke-function',
  data: {
    requestId: number | string;
    result: Result
  },
}


interface EvalScriptResult {
  event: 'eval-script',
  data: {
    requestId: number | string;
    result: Result
  },
}
```
:::

## invoke-function
原理：把所有可能用到的方法，对象挂载到 `window.__plugin_app` 上，然后在 iframe 中通过 `postMessage` 中传入对应的 function 调用路径字符串，和相应的参数数组，然后在 DAM 解析并调用对应的方法:

### 1. 无需函数执行结果
```ts
// iframe.tsx
window.postMessage({
    event: 'invoke-function',
    data: {
        functionPath: 'history.push',
        paramArray: ['/dam_enterprise/portal_list'],
        requestId: Date.now()
    },
    from: '{{ slot-code }}'
});

// main app
window.addEventListener('message', e => {
    if(e.data.event === 'invoke-function') {
        const { functionPath, paramArray } = e.data.data;
        const fn = get(window.__pluign_app, functionPath)
        fn(...paramArray);
    }
})
```
这种方式相对安全，可以考虑以后暴露给外部使用。

### 2. 需要函数执行结果，参考[`eval-script`的实现](#eval-script)

## eval-script
这种方法直接调用 `eval` 函数，在全局作用域中执行传入的字符串，因此可能会有安全隐患。

### 1.直接调用，无需函数执行结果
```ts
// iframe
const jsCode = 'window.__plugin_app__.history.push(\'/dam_enterprise/portal_list\')'
window.postMessage({
    event: 'eval-script',
    data: {
        code: jsCode,
        requestId: Date.now()
    },
})

// main app
window.addEventListener('message', e => {
    if(e.data.event === 'eval-script') {
        Function(payload.data.code)()
    }
});
```
### 2. 需要函数执行结果
如果说你需要函数调用的返回值，请参考下面代码。
```ts 
// iframe
dispatchEvent("eval-script", {
    code,
    requestId: Date.now(),
})

const dispatchEvent = (event, data) => {
    window.parent?.postMessage(
        {
            event,
            data,
        },
        "*"
    );

    const hasRequestId = data?.requestId;

    return new Promise((resolve) => {
        if (!hasRequestId) {
            return resolve(true);
        }

        window.addEventListener(`message`, function listener(e) {
            if (e.data.event === event && e.data.?.requestId === data.requestId) {
                resolve(e.data.result);
                window.removeEventListener(`message`, listener);
            }
        });
    });
}
```
- 如果需要取回函数调用的结果，那么 `requestId` 必不可少。


## 对 iframe postMessage 的简单封装
```ts
`Pubsub` 就是一个简单的发布订阅模式的实现。

const getEventAdapter = () => {
    const pubsub = new Pubsub();

    const addEventListener = (event: string, listener: (data: any) => void) => {
        return pubsub.subscribe(event, listener);
    };

    const dispatchEvent = (event: string, data?: any) => {
        window.parent?.postMessage(
            {
                event,
                data,
            },
            "*"
        );
    };

    window.addEventListener("message", (e) => {
        if (!e.data.event) return;
        pubsub.notify(e.data.event, e.data.data);
    });

    return {
        addEventListener,
        dispatchEvent,
        removeEventListener: pubsub.unsubscribe.bind(pubsub),
    };
};

const eventAdapter = getEventAdapter();

// promisfy addEventListener
const onEvent = (event: string, data?: any) => {
    const hasRequestId = data?.requestId;

    const responsePromise = new Promise((resolve) => {
        if (!hasRequestId) {
            return resolve(true);
        }
        eventAdapter.addEventListener(`${event}`, (d) => {
            if (d?.requestId === data.requestId) {
                resolve(d.result);
            }
        });
    });

    data && eventAdapter.dispatchEvent(event, data);

    return responsePromise;
}
```

用法：
```ts
await onEvent("eval-script", {
  code,
  requestId: Date.now(),
})
```