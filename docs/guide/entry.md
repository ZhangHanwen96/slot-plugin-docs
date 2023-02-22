## Entry

`entry` 是一个特殊的 slot，仅接受 plugin type 为 function。 接受一个 app 对象作为入参，app 对象封装并对外提供调用 DAM 项目里的一些能力，比如注册新的自定义路由和增加左侧导航栏的自定义链接等。

-   Interface 
    ```ts
    export default (app: App) => void;
    ```
-   Detail
    -   `app` 对象封装并对外提供调用 DAM 项目里的一些能力，比如注册新的自定义路由和增加左侧导航栏的自定义链接等。
    -   `default` 导出

### `app.addRoute()`

-   Type

    ```ts
    function addRoute(config: RouteConfig): void;

    export type RouteConfig = IframeType | ComponentType;

    type ComponentPluginExport = {
        render: (container: HTMLElement, props: any) => void;
        cssString?: string;
        useShadowDom?: boolean;
    };

    interface ComponentRouteConfig {
        title: string;
        to: string;
    }
    interface IframeType extends ComponentRouteConfig {
        url?: string;
    }
    interface ComponentType extends ComponentRouteConfig {
        plugin?: ComponentPluginExport | (() => Promise<ComponentPluginExport>);
    }
    ```

-   Detail
    -   `plugin` 字段的类型 `ComponentPluginExport`, 和 `component plugin` 的导出字段一致，并且在次基础上提供了懒加载的功能。
    -   `title` 字段是导航的标题，会在左侧导航栏显示。
    -   `to` 字段是路由的路径，会在浏览器地址栏显示。

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



### `app.addPortalHeaderAction()`
  
- Type 
    ```ts
    function addPortalHeaderAction(render: ComponentPluginExport['render'], optionts: {
        /**
         * default true
         */
        prepend?: boolean;
        /**
         * default true
         */
        divider?: boolean;
    }): void;
    ```
- Detail
  * `options.prepend` 插入顶部原本action区域的到前面还是后面, 默认是前面
  * `options.divider` 是否在插入的元素前面（后面）加上分隔线
- Example
    ::: code-group
    ```ts [index.tsx]
    import {render as _redner} from './component.tsx'
    const portalHeaderActionPlugin = ({addPortalHeader}: any) => {
        if(!addPortalHeader) return;
        addPortalHeader(render, {
            divider: false
        });
    }

    export const render = portalHeaderActionPlugin;
    ```

    ```ts [component.tsx]
    const weakMap = new WeakMap<HTMLElement, Root>();
    const render = (container: HTMLElement, props: any) => {
        if (!weakMap.get(container)) {
            weakMap.set(container, createRoot(container));
        }
        weakMap.get(container)!.render(<button>Custom Button</button>);
    };
    ```
    :::
    在 `index.tsx` 中最后将 `portalHeaderActionPlugin` 具名导出为 `render` 是为了命名的一致性，遵循了 `component plugin` 的导出规定, 希望不要混淆。