`component plugin` 主要负责在 `Slot` 中渲染 UI。和它的名字不同，其实对外暴露的并不是一个组件，而是一个渲染组件的 `render` 函数，并接受 rootElement 和 props 作为入参。由于前端框架众多，DAM 本身用了 React 开发，如果限制 plugin 抛出一个 React 组件，那么将大大降低开发的灵活性，和不同 React 版本兼容的问题。所以采用了 `render` 函数的方式，这样打包产物就包含了框架 runtime 和 UI组件，可以与 DAM 互不依赖。

`component plugin` 会被作为一个 [`Web Component`](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 渲染到 Slot 中，并且支持开启 [Shadow Dom](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)。这样做的好处是，可以避免 CSS 样式污染，也可以避免不同插件之间的 DOM 事件冲突。


![web component](/web-component-sreenshot.jpeg)

::: code-group

```ts [react-18.tsx]
import { createRoot, Root } from 'react-dom/client'
import App from "./App";

const weakMap = new WeakMap<HTMLElement, Root>();
export const render = (root: HTMLDivElement | ShadowDom, props: any) => {
    if (!weakMap.get(container)) {
        weakMap.set(container, createRoot(container));
    }
    weakMap.get(container)!.render(<App {...props} />, root);
};
```

```ts [react-16.tsx]
import App from "./App";
export const render = (root: HTMLDivElement | ShadowDom, props: any) => {
    ReactDOM.render(<App {...props} />, root);
};
```
- 开启关闭 Shadow Dom
    Shadow Dom 默认开启，控制开关为 `useShadowDom` 字段:
    ```ts {5}
    const render = (...) => {...}
    const useShadowDom = false;
    export {
        render,
        useShadowDom,
    }
    ```
  


<!-- ```ts [vue-plugin.tsx]
import App from "./App.vue";
import { createApp, h } from "vue";
export const render = (root: HTMLDivElement | ShadowDom, props: any) => {
    const app = createApp(App, {  // [!code --]
        props, // [!code --]
    }); // [!code --]
    // 需要传入render函数的方式创建，才能
    const app = createApp({ // [!code ++]
        render: () => h(App, {}), // [!code ++]
    }); // [!code ++]
    app.mount(root);
};
``` -->

:::
