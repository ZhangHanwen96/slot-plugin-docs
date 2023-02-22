`function plugin` 一般作为，比如说文件上传链路的前置或者后置校验，在校验过程中也可以做唤起弹窗之类的 UI 操作（这个取决于 plugin 开发方）。总之，它不会渲染任何 UI 到 Slot 中。

  
### <span style="color: var(--vp-c-brand)">Plugin Export 规范</span>
作为 `default` 导出
```ts
export default fn as (props: any, app?: any) => any;
```