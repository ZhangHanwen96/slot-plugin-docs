import{_ as o,o as p,c as e,x as s,a as n,D as l,N as t,B as c}from"./chunks/framework.a6903ff1.js";const w=JSON.parse('{"title":"Communication","description":"","frontmatter":{"lastUpdated":true,"title":"Communication","layout":"doc"},"headers":[],"relativePath":"guide/example-readiness.md"}'),r={name:"guide/example-readiness.md"},y=s("h2",{id:"插件开发流程",tabindex:"-1"},[n("插件开发流程 "),s("a",{class:"header-anchor",href:"#插件开发流程","aria-label":'Permalink to "插件开发流程"'},"​")],-1),D=s("li",null,"首先查看 slot 列表，是否有符合的 slot，如果没有，需要向 PM 提需求",-1),F=s("li",null,"启动开发服务器，开发 plugin。可以先当作正常组件开发",-1),i=s("ol",null,[s("li",null,"开发: localhost:3000"),s("li",null,"UAT & PROD 需要上传打包后的静态文件到 CDN，然后配置 plugin 的导入URL")],-1),A=s("strong",null,"4.2",-1),C=s("i",null,"@Hanwen",-1),d=t("",5);function u(_,h,g,m,B,f){const a=c("Badge");return p(),e("div",null,[y,s("ol",null,[D,s("li",null,[n("决定用哪种类型的 plugin，用 cli（react） 生成 plugin 模版 "),l(a,{type:"warning",text:"TBD"})]),F,s("li",null,[n("需要在 DAM 里验证，CS后台配置 plugin 的导入URL "),l(a,{type:"warning",text:"TBD"}),i]),s("li",null,[A,n(" 需要依赖 cdn上传工具 "),l(a,{type:"warning",text:"TBD"}),n("，现阶段联系tezign基建同事 "),C])]),d])}const T=o(r,[["render",u]]);export{w as __pageData,T as default};
