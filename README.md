# uestc-slide-html

用于组会/论文汇报的静态 HTML 模板，包含两个部分：
- 汇总页：左侧日历 + 右侧归档列表，集中展示所有汇报链接。
- 幻灯片模板：可直接在浏览器播放的单页 HTML PPT，支持章节导航、数学公式与代码高亮。

## 项目结构
- index.html：汇总页，内置日历和归档列表，数据在 `filesData` 数组内配置。
- slide-temp.html：演示模板示例，包含封面页、双栏/三栏布局、图片预览示例。
- assets/css/main.css：按层拆分的样式入口（主题、全局、布局、工具、导航/页脚）。
- assets/js/config.js：PPT 全局配置（尺寸、页脚、快捷键、Prism/MathJax 开关）。
- assets/js/core.js：PPT 核心逻辑（章节导航、自动播放、键盘/触摸交互、代码高亮/公式渲染）。
- media/：自备的本地图片或视频资源存放处。

## 主要特性
- 汇总页
  - 左侧月份切换日历，自动标记有汇报的日期，点击可弹出预览/跳转。
  - 右侧按时间倒序的归档列表，显示总数量计数。
- 幻灯片模板
  - 16:9 舞台，响应式缩放，支持键盘/触摸翻页和全屏。
  - 章节导航栏 + 页脚自动生成，记忆上次浏览页码。
  - 支持 MathJax 公式与 Prism 代码高亮，提供多种卡片/网格/警示块样式。
  - 图片点击放大，打印模式自动去掉导航/页脚。

## 快速开始
1) 打开汇总页
	- 直接用浏览器打开 `index.html` 即可预览。
	- 在文件顶部的 `filesData` 数组追加 `{ date, title, type, link }` 条目来新增汇报。

2) 使用幻灯片模板
	- 打开 `slide-temp.html`，修改顶部的 `slideData`（标题、作者、日期、出版信息）。
	- 每一页通过 `data-chapter-id` / `data-chapter-title` 分组，章节标题和页码自动渲染。
	- 需要更多页面时复制 `.slide` 区块，并选择合适的布局类（如 `layout-grid-2`、`layout-grid-3`）。

3) 自定义样式与功能
	- 颜色/字体等主题变量：调整 `assets/css/layers/1-theme.css`。
	- 布局与组件（卡片、表格、警示框等）：查看 `assets/css/layers/3-layout.css`。
	- 导航栏和页脚样式：查看 `assets/css/layers/5-presentation-frame.css`。
	- 全局配置（页脚文案、快捷键、自动播放等）：修改 `assets/js/config.js`。

## 依赖
- 前端仅依赖 CDN：Tailwind（汇总页）、Prism.js、MathJax。无需构建流程，双击即用。

## 建议
- 如果需要部署到站点，建议通过本地 HTTP 服务（如 `python -m http.server`）打开，以避免少数浏览器的本地资源访问限制。
- 提交前可在浏览器逐页检查公式与代码高亮是否按预期渲染。
