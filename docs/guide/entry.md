## Entry

`entry` 是一个特殊的 slot，仅接受 plugin type 为 function。 接受一个 app 对象作为入参，app 对象封装并对外提供调用 DAM 项目里的一些能力，比如注册新的自定义路由和增加左侧导航栏的自定义链接等。

-   Interface 
    ```ts
    export default (app: PluginApp) => void;
    ```
-   Detail
    -   `app` 对象封装并对外提供调用 DAM 项目里的一些能力，比如注册新的自定义路由和增加左侧导航栏的自定义链接等。
    -   `default` 导出

### `app.addRoute()`

-   Type
    ```ts
    function addRoute(config: RouteConfig): void;

    export type RouteConfig = IframeType | ComponentType;

    interface ComponentRouteConfig {
        title?: string;
        to: string;
    }
    interface IframeType extends ComponentRouteConfig {
        url: string;
    }
    interface ComponentType extends ComponentRouteConfig {
        plugin: PluginExport.Component | (() => Promise<PluginExport.Component>);
    }
    ```

-   Detail
    -   `plugin` 字段的类型 `PluginExport.Component`, 和 `component plugin` 的导出字段一致，并且在此基础上提供了懒加载的功能。
    -   `to`: 路由的路径，会在浏览器地址栏显示。
    -   `url`: iframe 的静态资源地址

-   Example
    ::: code-group

    ```ts [normal-import.ts]
    import Comp from "./component";
    const weakMap = new WeakMap<HTMLElement, Root>();
    export default (app) => {
         app.addRoute({
            title: "comopnent-normal",
            to: "/plugin/Route-demo-component-normal",
            plugin: {
                render: (container: HTMLElement) => {
                    if (!weakMap.get(container)) {
                        weakMap.set(container, createRoot(container));
                    }
                    weakMap.get(container)!.render(<Comp />);
                },
                useShadowDom: false,
            },
        });
    }
    ```

    ```ts [lazy-import.ts]
    export default (app) => {
         app.addRoute({
            title: "comopnent-lazy",
            to: "/plugin/route-demo-component-lazy",
            plugin: () => import("./lazy-component"),
        });
    }
    ```

    ```ts [lazy-component.tsx]
     const render = async (container: HTMLElement) => {
            if (!weakMap.get(container)) {
                weakMap.set(container, createRoot(container));
            }
            weakMap.get(container)!.render(<Component />);
        };
    const useShadowDom = true;
    export {
        render,
        cssString,
        useShadowDom,
    }
    ```
    :::