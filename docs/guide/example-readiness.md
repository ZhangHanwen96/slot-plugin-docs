---
lastUpdated: true
title: Communication
layout: doc
---

## 插件开发流程

1. 首先查看 slot 列表，是否有符合的 slot，如果没有，需要向 PM 提需求
2. 决定用哪种类型的 plugin，用 cli（react） 生成 plugin 模版  <Badge type="warning" text="TBD" />
3. 启动开发服务器，开发 plugin。可以先当作正常组件开发
4. 需要在 DAM 里验证，CS后台配置 plugin 的导入URL <Badge type="warning" text="TBD" />
   1. 开发: localhost:3000
   2. UAT & PROD 需要上传打包后的静态文件到 CDN，然后配置 plugin 的导入URL
5. <strong>4.2</strong> 需要依赖 cdn上传工具 <Badge type="warning" text="TBD" />，现阶段联系tezign基建同事 <i>@Hanwen</i>  

### 开发相关联系 @Hanwen Zhang 张瀚文


## Component type plugin 简单例子 (前端开发向)

```tsx
import App from "./App";

const weakMap = new WeakMap<HTMLElement, Root>();
export const render = (root: HTMLDivElement | ShadowDom, props: any) => {
    if (!weakMap.get(container)) {
        weakMap.set(container, createRoot(container));
    }
    weakMap.get(container)!.render(<App {...props} />, root);
};
```
- `App` 是一个 React 组件
- 具名导出 `render`

以上就是正常的 React 组件开发，只是把 `ReactDOM.render` 换成了我们定义的 `render` 函数，这样就可以在 DAM 中使用了。