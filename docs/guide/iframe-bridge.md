---
lastUpdated: true
title: Iframe bridge
layout: doc
---

# {{ $frontmatter.title }} (<span style="color: ff471e">Internal Use Only</span>)

对于 Tezign 内部的定开团队，可能会用到 DAM App 的一些内部函数，比如说 路由跳转，http的实例，当前 URL等等。由于跨域的限制，我们无法直接在 iframe 中调用 DAM 的 `window` 对象，因此我们需要通过 `iframe bridge` 来实现: 

## 1. invoke-function
原理：把所有可能用到的方法，对象挂载到 `window.__plugin_app` 上，然后在 iframe 中通过 `postMessage` 中传入对应的 function 调用路径字符串，和相应的参数数组，然后在 DAM 解析并调用对应的方法:
```ts
// iframe.tsx
window.postMessage({
    event: 'invoke-function',
    data: {
        functionPath: 'history.push',
        paramArray: ['/dam_enterprise/portal_list']
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

## 2. eval-script
这种方法直接调用 `eval` 函数，在全局作用域中执行传入的字符串，因此可能会有安全隐患。

```ts
// iframe
const jsCode = 'window.__plugin_app__.history.push(\'/dam_enterprise/portal_list\')'
window.postMessage({
    event: 'eval-script',
    data: jsCode,
})

// main app
window.addEventListener('message', e => {
    if(e.data.event === 'eval-script') {
        (1, eval)(e.data.data);
    }
})

```