---
title: Plugin Types
editLink: true
---

# {{ $frontmatter.title }}

一共支持三种 pluign 类型，分别是 [component](#component-type), [function](#function-type), [iframe](#iframe-type)

## Component Type
`component plugin` 主要负责在 `Slot` 中渲染 UI。和它的名字不同，其实对外暴露的并不是一个组件，而是一个渲染组件的 `render` 函数，并接受 rootElement 和 props 作为入参。由于前端框架众多，DAM 用了 React开发，如果限制 plugin抛出一个 React 组件，那么将大大降低开发的灵活性，和不同 React 版本兼容的问题。所以采用了 `render` 函数的方式，这样打包产物就包含了框架 runtime 和 UI组件，可以与 DAM 互不依赖。

component plugin 的组件会被作为一个 [`Web Component`](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 渲染到 Slot 中，并且支持开启 [Shadow Dom](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)。这样做的好处是，可以避免 CSS 样式污染，也可以避免不同插件之间的 DOM 事件冲突。

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

  
### <span style="color: var(--vp-c-brand)">Plugin Export 规范</span>
不接受 `default` 导出，接受具名导出，如下：
```ts
type PluginConfig = {
    render(root: HTMLDivElement | ShadowRoot, props: any, app?: any): void;
    /**
     * default true
     */
    useShadowDom?: boolean;
    cssString?: string;
}

export config: PluginConfig;
```

### `Shadow Dom`。
- #### Shadow Dom 默认开启，控制开关为 `useShadowDom` 字段:
```ts:line-numbers {5}
const render = (...) => {...}
const useShadowDom = false;
export {
    render,
    useShadowDom,
}
```
- #### Shadow Dom 样式
Shadow Dom 具有天然样式隔离（shadow root里面和外层的样式互不影响,），但是外层的 css variable和一些可继承的属性，会被继承到 Shadow Dom 里面（font-family等）。 

css 样式正常会直接注入到全局(header元素下面), 使用shadow dom到话需要把 css 注入到 shadow root 下面，所以需要以具名变量的方式导出 plugin 的 css, 有两种方式：
1. 一种是使用我们提供的 vite plugin
    ::: danger
    TODO
    :::
2. 手动导出
    vite 提供 inline css import, 以 `?inline` 作为 import 的后缀:
    ```ts
    import appCssString from './app.module.scss?inline';
    console.log(appCssString) // { root: {display: flex, background: red}...}
    ```

    所以你需要手动以 inline css 的方式 import 所有依赖的 css, 然后把它们拼接起来，作为 plugin 的 css 字符串导出:

    ```ts
    import appCssString from './app.module.scss?inline';
    import layoutCssString from './layout.module.scss?inline';
    import headerCssString from './header.module.scss?inline';
    const cssString = `${appCssString}${layoutCssString}${headerCssString}`;

    export {
        cssString,
        render,
        useShadowDom
    }
    ```


## Function Type
<!--@include: ./plugin-function.md-->

## Iframe Type
<!--@include: ./plugin-iframe.md-->


## Examples
[Universal component plugin example](./plugin-component)

[Function example](./plugin-function)

[Iframe plugin example](./plugin-iframe.md)
