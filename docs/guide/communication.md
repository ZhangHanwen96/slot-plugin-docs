---
lastUpdated: true
title: Communication
layout: doc
---

# {{ $frontmatter.title }}

## Iframe plugin

iframe 和主 App 之间通过 postMessage 进行通信。

确保在 嵌入在 slot 里的 iframe 应用 `onMount` 的时候，向主 App 发送 `ready` 事件

::: code-group

```ts:line-numbers {6-16} [iframe-plugin.ts]
const IframeApp = () => {
    // onMount
    useEffect(() => {
        // 确保作为 iframe 被嵌入
        if (window.top !== window.self) {  // [!code focus:13]
            window.postMessage(
                {
                    event: "ready",
                    data: {
                        // 传递给主 App 的数据
                        greetings: "hello world",
                    },
                },
                "*"
            );
        }
    }, []);
};
```
:::

### Events
-   `ready`
-   `props`
-   `invoke-function` | `invoke-function-result`

## Component plugin

用户提供的 `component` 类型插件在 DAM 里是作为 `Web Component` 嵌入应用的，因此可以使用 Element 原生的事件机制进行通信。
::: code-group

```ts:line-numbers [receive-custom-event.tsx]

const App = () => {
    const elRef = useRef();

    useEffect(() => {
        elRef.current.addEventListener ('some-custom-event', (e) => {  // [!code focus:3]
            console.log(e.detail)
        })
    }, [])

    return <div ref={elRef}></div>
}
```

```ts:line-numbers {7,8,11} [dispatch-custom-event.tsx]

const App = () => {
    const elRef = useRef();

    const handleClick = () => {
        // [!code focus] // document or elRef.current
        document.dispatchEvent(new CustomEvent('some-custom-event', { // [!code focus:5]
            detail: {
                data: 'hello world'
            },
            composed: true, // important! 确保事件穿透 shadow DOM boundary 到 standard DOM.
        }))
    }

    return <button ref={elRef} onClick={handleClick}></button onClick={handleClick}>
}
```

:::

事件名称 `some-custom-event`，是由 DAM 不同插槽提供的自定义事件，具体事件名称请参考 [插槽列表](./available-slots.md)。<span style="color: #8742ab">遵循 HTML 原生事件命名的规则，一般是以 `-` 分隔。</span>