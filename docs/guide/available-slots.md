---
lastUpdated: true
title: Slots List
layout: doc
---

<script setup>
    const imageUrl = 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8650d8babb9b41c0be0ab90683b4c075~tplv-k3u1fbpfcp-no-mark:462:462:330:462.awebp?'
</script>

<style>
    .componen-type {
        color: green;
    }
    .iframe {
        color: blue;
    }
</style>

# {{ $frontmatter.title }}

## 可用 Slot 插槽

| Slot Code                                                        | Accept Plugin Type |                                                        Description |
| ---------------------------------------------------------------- | :----------------: | -----------------------------------------------------------------: |
| <span class='componen-type' style="fontWeight: 600">entry</span> |      function      |                      entry 是特殊的插槽，具体见[entry](./entry.md) |
| portal-detail-card                                               |     component      |                            portal 详情页，分享页面的自定义预览卡片 |
| portal-header-action                                             |     component      |                                  portal 详情页的顶部自定义按钮插入 |
| portal-detail-operation-more                                     |      function      |                          Portal 详情页的批量操作"**更多**"下拉选项 |
| material-library-operation-more                                  |      function      | /dam_enterprise/approved_list 素材页面的批量操作"**更多**"下拉选项 |

## `entry` - 特殊 Slot
细节见 [entry slot](./entry.md)

## `portal-detail-card`
-   Export Interface
    ```ts
    interface ExportInterface {
        render: PluginConfig['render'];
        gridConfig?: {
            xs?: number;
            sm?: number;
            lg?: number;
            xl?: number;
            xxl?: number;
        }
    }
    export config as ExportInterface;
    ```
-   Detail
    -   `render` 同 `Component Plugin` 的 `render`，具体可以参考 [Component Plugin]()
    -   `gridConfig` 是一个可选的配置，用于控制 Portal分发页面中的卡片布局，具体的配置可以参考 [antd grid](https://ant.design/components/grid-cn/#Col)


## `portal-header-action`
-   Export Interface
    ```ts
    interface App {
        addPortalHeaderAction: (render: PluginConfig['render'], options: {
            /**
             * default true
             */
            divider?: boolean;
            /**
             * default true
             */
            prepend?: boolean
        }) => void;
    }
    type HeaderActionRender = (app: App) => void;
    export const render as HeaderActionRender
    ```
-   Detail
    - `addPortalHeaderAction` 的入参 `render` 同 `Component Plugin` 的 `render`，具体可以参考 [Component Plugin]()。  最后将 `portalHeaderActionPlugin` 具名导出为 `render` 是为了命名的一致性, 切勿混淆。
    - `options.prepend` 插入顶部原本action区域的到前面还是后面, 默认是前面
    - `options.divider` 是否在插入的元素前面（后面）加上分隔线
  
-   Example
    ::: code-group
    ```ts [header-action.ts]
    import {render as _render} from './render';

    const headerActionRender = ({addPortalHeaderAction}: App) => {
        if(!addPortalHeaderAction) return;
        addPortalHeaderAction(_render);
        addPortalHeaderAction(_render, {
            divider: false
        });
        return _render;
    }

    export const render = headerActionRender
    ```
    ```ts [render.ts]
    const weakMap = new WeakMap<HTMLElement, Root>();
    const render = (container: HTMLElement, props: any) => {
        if (!weakMap.get(container)) {
            weakMap.set(container, createRoot(container));
        }
        weakMap.get(container)!.render(<button style={{
            background: 'var(--color-primary)',
            color: 'white',
            padding: '4px 15px',
            borderRadius: '5px',
            height: '32px',
            whiteSpace: 'nowrap',
            border: 'none'
        }}>Custom Button</button>);
    };
    export {
        render
    }
    ```
    :::

## portal-detail-operation-more
-   Export Interface
    ```ts
    interface MenuItem {
        /** key */
        key?: string | number;
        /** 标题 */
        title?: string;
        icon?: string;
        /** Button类型  */
        type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | 'danger';
        /** children */
        children?: (IItem | undefined)[];
        onClick?: (data: any) => void;
        /** container 类名 */
        className?: string;
        /** 前分割线 */
        preDivider?: boolean;
        /** 后分割线 */
        postDivider?: boolean;
        style?: React.CSSProperties;
        /** 按钮禁用 */
        disable?: boolean;
        /** 按钮tooltip文案 */
        tooltip?: string | (() => string | undefined)
    }
    export default config as MenuItem[]
    ```
-   Detail
    -  接受 `default` 数组导出配置。
    -  接受 icon 的形式:
       -  1. svg icon: `<svg>...</svg>`
       -  2. svg 转成 data uri 之后的：`data:image/svg+xml,...`
  
-   Example
    ::: details Click me to view the code
    ```ts
    import {message, Modal} from 'antd'
    const MenuItems: MenuItem[] = [
        {
            key: 'custom-key',
            title: 'custom-title',
            onClick: (data: any) => {
                const m = Modal.confirm({
                    content: <div style={{
                        width: '100%',
                        height: '400px',
                        overflow: 'auto',
                    }}>
                        {JSON.stringify(data, null, 2)}
                    </div>,
                    onCancel: () => {
                        m.destroy();
                        message.info('modal destroyed');
                    },
                    onOk: () => {
                        message.success('ok!');
                    },
                    closable: true,
                    width: '50vw',
                    centered: true,
                })
            },
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="m494.07 281.6l-25.18-78.08a11 11 0 0 0-.61-2.1l-50.5-156.94a20.08 20.08 0 0 0-19.17-13.82a19.77 19.77 0 0 0-18.95 13.94l-48.14 149.55h-152L131.34 44.59a19.76 19.76 0 0 0-18.86-13.94h-.11a20.15 20.15 0 0 0-19.12 14L42.7 201.73c0 .14-.11.26-.16.4l-25.63 79.48a29.15 29.15 0 0 0 10.44 32.46l221.44 162.41a11.25 11.25 0 0 0 13.38-.07l221.48-162.34a29.13 29.13 0 0 0 10.42-32.47m-331-64.51l61.73 191.76L76.63 217.09m209.64 191.8l59.19-183.84l2.55-8h86.52L300.47 390.44M398.8 59.31l43.37 134.83h-86.82M324.16 217l-43 133.58l-25.66 79.56L186.94 217M112.27 59.31l43.46 134.83H69M40.68 295.58a6.19 6.19 0 0 1-2.21-6.9l19-59l139.61 180.59m273.26-114.69L313.92 410.22l.52-.69L453.5 229.64l19 59a6.2 6.2 0 0 1-2.19 6.92"/></svg>'
        }
    ];

    export default MenuItems;
    ```
    :::


## `material-library-operation-more` 
同 [portal-detail-operation-more](#portal-detail-operation-more)


## 