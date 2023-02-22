import{_ as n,o as l,c as o,a as s,b as p,t as e,d as t}from"./app.69ebef6f.js";const u=JSON.parse('{"title":"Plugin Types","description":"","frontmatter":{"title":"Plugin Types","editLink":true},"headers":[{"level":2,"title":"Component Type","slug":"component-type","link":"#component-type","children":[{"level":3,"title":"Plugin Export 规范","slug":"plugin-export-规范","link":"#plugin-export-规范","children":[]},{"level":3,"title":"Shadow Dom。","slug":"shadow-dom。","link":"#shadow-dom。","children":[]}]},{"level":2,"title":"Function Type","slug":"function-type","link":"#function-type","children":[{"level":3,"title":"Plugin Export 规范","slug":"plugin-export-规范-1","link":"#plugin-export-规范-1","children":[]}]},{"level":2,"title":"Iframe Type","slug":"iframe-type","link":"#iframe-type","children":[]},{"level":2,"title":"Examples","slug":"examples","link":"#examples","children":[]}],"relativePath":"guide/plugin-index.md"}'),c={name:"guide/plugin-index.md"},r={id:"frontmatter-title",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),y=t(`<p>一共支持三种 pluign 类型，分别是 <a href="#component-type">component</a>, <a href="#function-type">function</a>, <a href="#iframe-type">iframe</a></p><h2 id="component-type" tabindex="-1">Component Type <a class="header-anchor" href="#component-type" aria-hidden="true">#</a></h2><p><code>component plugin</code> 主要负责在 <code>Slot</code> 中渲染 UI。和它的名字不同，其实对外暴露的并不是一个组件，而是一个渲染组件的 <code>render</code> 函数，并接受 rootElement 和 props 作为入参。由于前端框架众多，DAM 用了 React开发，如果限制 plugin抛出一个 React 组件，那么将大大降低开发的灵活性，和不同 React 版本兼容的问题。所以采用了 <code>render</code> 函数的方式，这样打包产物就包含了框架 runtime 和 UI组件，可以与 DAM 互不依赖。</p><p>component plugin 的组件会被作为一个 <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_blank" rel="noreferrer"><code>Web Component</code></a> 渲染到 Slot 中，并且支持开启 <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM" target="_blank" rel="noreferrer">Shadow Dom</a>。这样做的好处是，可以避免 CSS 样式污染，也可以避免不同插件之间的 DOM 事件冲突。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-5-C-m" id="tab-hDm9V_O" checked="checked"><label for="tab-hDm9V_O">react-18.tsx</label><input type="radio" name="group-5-C-m" id="tab-ew_VlrI"><label for="tab-ew_VlrI">react-16.tsx</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createRoot</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Root</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react-dom/client</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> App </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./App</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> weakMap </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WeakMap</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HTMLElement</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Root</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> render </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HTMLDivElement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ShadowDom</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">weakMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">container</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">weakMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">container</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createRoot</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">container</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">weakMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">container</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">!.</span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(&lt;</span><span style="color:#FFCB6B;">App</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{...</span><span style="color:#FFCB6B;">props</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> /&gt;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> App </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./App</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> render </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HTMLDivElement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ShadowDom</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(&lt;</span><span style="color:#FFCB6B;">App</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{...</span><span style="color:#FFCB6B;">props</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> /&gt;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div></div></div><h3 id="plugin-export-规范" tabindex="-1"><span style="color:var(--vp-c-brand);">Plugin Export 规范</span> <a class="header-anchor" href="#plugin-export-规范" aria-hidden="true">#</a></h3><p>不接受 <code>default</code> 导出，接受具名导出，如下：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PluginConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HTMLDivElement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ShadowRoot</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">app</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * default true</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">useShadowDom</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">cssString</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> PluginConfig</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="shadow-dom。" tabindex="-1"><code>Shadow Dom</code>。 <a class="header-anchor" href="#shadow-dom。" aria-hidden="true">#</a></h3><ul><li><h4 id="shadow-dom-默认开启-控制开关为-useshadowdom-字段" tabindex="-1">Shadow Dom 默认开启，控制开关为 <code>useShadowDom</code> 字段: <a class="header-anchor" href="#shadow-dom-默认开启-控制开关为-useshadowdom-字段" aria-hidden="true">#</a></h4></li></ul><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight has-highlighted-lines" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> render </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{...}</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useShadowDom </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">render</span><span style="color:#89DDFF;">,</span></span>
<span class="line highlighted"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">useShadowDom</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li><h4 id="shadow-dom-样式" tabindex="-1">Shadow Dom 样式 <a class="header-anchor" href="#shadow-dom-样式" aria-hidden="true">#</a></h4></li></ul><p>Shadow Dom 具有天然样式隔离（shadow root里面和外层的样式互不影响,），但是外层的 css variable和一些可继承的属性，会被继承到 Shadow Dom 里面（font-family等）。</p><p>css 样式正常会直接注入到全局(header元素下面), 使用shadow dom到话需要把 css 注入到 shadow root 下面，所以需要以具名变量的方式导出 plugin 的 css, 有两种方式：</p><ol><li><p>一种是使用我们提供的 vite plugin</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>TODO</p></div></li><li><p>手动导出 vite 提供 inline css import, 以 <code>?inline</code> 作为 import 的后缀:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> appCssString </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./app.module.scss?inline</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(appCssString) </span><span style="color:#676E95;font-style:italic;">// { root: {display: flex, background: red}...}</span></span>
<span class="line"></span></code></pre></div><p>所以你需要手动以 inline css 的方式 import 所有依赖的 css, 然后把它们拼接起来，作为 plugin 的 css 字符串导出:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> appCssString </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./app.module.scss?inline</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> layoutCssString </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./layout.module.scss?inline</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> headerCssString </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./header.module.scss?inline</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> cssString </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">appCssString</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">layoutCssString</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">headerCssString</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">cssString</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">render</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">useShadowDom</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></li></ol><h2 id="function-type" tabindex="-1">Function Type <a class="header-anchor" href="#function-type" aria-hidden="true">#</a></h2><p><code>function plugin</code> 一般作为，比如说文件上传链路的前置或者后置校验，在校验过程中也可以做唤起弹窗之类的 UI 操作（这个取决于 plugin 开发方）。总之，它不会渲染任何 UI 到 Slot 中。</p><h3 id="plugin-export-规范-1" tabindex="-1"><span style="color:var(--vp-c-brand);">Plugin Export 规范</span> <a class="header-anchor" href="#plugin-export-规范-1" aria-hidden="true">#</a></h3><p>作为 <code>default</code> 导出</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> fn </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">app</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="iframe-type" tabindex="-1">Iframe Type <a class="header-anchor" href="#iframe-type" aria-hidden="true">#</a></h2><p><code>Iframe Plugin</code> 就是正常的 web 应用，和主应用的数据交换需要遵循 <a href="./communication.html">communication</a>，并且具体 <code>slot</code> 对应的 传输数据的 interface 见 <a href="./.html"></a>。 开发，打包，上传完成之后把对应的 <code>index.html</code> 的 <code>URL地址</code>保存在想要在 DAM 插入的对应 <code>slot</code> 中。</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h2><p><a href="./plugin-component.html">Universal component plugin example</a></p><p><a href="./plugin-function.html">Function example</a></p><p><a href="./plugin-iframe.html">Iframe plugin example</a></p>`,26);function D(a,F,C,A,d,h){return l(),o("div",null,[s("h1",r,[p(e(a.$frontmatter.title)+" ",1),i]),y])}const g=n(c,[["render",D]]);export{u as __pageData,g as default};
