---
lastUpdated: true
title: Introduction
layout: doc
---

# {{ $frontmatter.title }}

通过插件系统，租户可以在不侵入 **DAM** 代码，不依赖 **DAM** 发板情况下，通过插件的方式来实现自己的定制化需求。<span style="color: var(--vp-c-brand); fontWeight: bold">Tezign</span> 负责提供 [Slot](#slot-插槽) 的位置，数据规范，以及可插入的 [Plugin](#plugin-插件) 类型，租户负责具体 `Plugin` 的实现。

## Slot 插槽

一个 Slot 是指在 DAM 项目中的提供区域，提供插入自定义组件，特定行为前后执行自定义函数能力的位置。Slot 具体的位置和接受的 [Plugin](#plugin-插件) 种类是由 Tezign 内部决定的，详细的 Slot 位置可以在 [全部插槽位置列表](/guide/available-slots.md) 中查看。

## Plugin 插件

`Plugin` 是指在DAM 项目中对应的 `Slot` 中渲染的自定义组件，或者是特定行为执行前后的自定义函数。`Plugin` 可以是一个 React 组件，一个 iframe，也可以是一个函数。`Plugin` 的具体类型由对应的 `Slot` 决定，详细的 `Plugin` 类型可以在 [全部插槽位置列表](/guide/available-slots) 中查看。
