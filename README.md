# 网站案例展示页面 / Website Case Gallery

这是一个静态 HTML 网站案例展示页面，适合用于展示网站项目截图、客户案例、作品集页面、项目演示页面，以及后续扩展为更完整的网站案例库。

当前版本继续保持静态页面结构，不依赖后台系统。页面通过配置化 JavaScript 数据渲染项目卡片，每个项目支持多张截图轮播、Fancybox 大图预览，以及 Visit Website 访问按钮。

---

## Release 标题

Website Case Gallery UI Upgrade

## Release 描述

本次版本将原有较基础的项目展示页升级为更适合正式展示的网站案例页面。主要优化包括：重构页面视觉风格，使用浅灰背景、白色圆角卡片、柔和阴影、图片渐变遮罩、卡片 hover 上浮效果和更清晰的信息层级；将页面相关 JavaScript 从 `index.html` 中拆分到独立的 `js/main.js`，后续维护项目数据和交互逻辑更方便；增强 Visit Website 按钮结构，并针对移动端进行了更友好的单列布局和全宽按钮适配。

---

## 本次更新内容

- 优化整体视觉风格：浅灰背景、白色卡片、圆角、阴影和更现代的页面间距
- 增加顶部 Hero 区域，让页面更像正式作品集或案例库首页
- 增加 Featured Website Cases 区域标题和说明文字
- 卡片图片区域增加渐变遮罩与 Case 编号标识
- 卡片内容增加项目说明、截图提示和 Visit Website 操作按钮
- Visit Website 支持真实链接；如果暂时没有链接，可配置为 `#`，按钮会显示为禁用状态
- 移动端优化为单列展示，按钮在手机端显示为全宽，点击区域更友好
- 将原本写在 `index.html` 中的 JavaScript 拆分到 `js/main.js`
- 保留 Swiper 图片轮播和 Fancybox 大图预览功能
- 保持静态 HTML 页面方案，方便直接部署或嵌入其他页面

---

## 项目特点

- 静态 HTML 页面，无需后台环境
- 项目数据集中写在 `js/main.js` 中，便于后续新增和维护
- 每个项目可配置多张截图
- 支持卡片内图片轮播
- 支持点击图片查看大图
- 支持项目访问按钮
- 适配桌面端、平板端和手机端
- 适合继续扩展为案例库、作品集、客户项目展示页或 WordPress 页面模块

---

## 技术栈

- HTML5：页面结构
- CSS3：布局、视觉样式、响应式适配
- JavaScript：项目数据配置、卡片渲染、懒加载初始化
- Swiper：项目截图轮播
- Fancybox：截图大图预览

---

## 项目结构

```bash
wp-preview-main/
├─ index.html
├─ css/
│  ├─ style.css
│  ├─ swiper-bundle.min.css
│  └─ fancybox.css
├─ js/
│  ├─ main.js
│  ├─ swiper-bundle.min.js
│  └─ fancybox.umd.js
├─ images/
│  ├─ project01/
│  │  ├─ 1.webp
│  │  ├─ 2.webp
│  │  ├─ 3.webp
│  │  ├─ 4.webp
│  │  ├─ 5.webp
│  │  └─ 6.webp
│  ├─ project02/
│  │  ├─ 1.webp
│  │  ├─ 2.webp
│  │  ├─ 3.webp
│  │  └─ 4.webp
│  ├─ project03/
│  ├─ project04/
│  ├─ project05/
│  └─ project06/
└─ README.md
```

---

## 如何新增项目

### 1. 新增项目图片目录

例如新增 `project07`：

```bash
images/project07/
├─ 1.webp
├─ 2.webp
└─ 3.webp
```

### 2. 在 `js/main.js` 中新增项目配置

```js
{
  id: "project07",
  title: "网站07",
  url: "https://example.com",
  images: ["1.webp", "2.webp", "3.webp"]
}
```

字段说明：

- `id`：项目目录名称，需要和 `images/` 下的文件夹名称一致
- `title`：卡片显示的项目标题
- `url`：Visit Website 按钮链接；如果暂时没有链接，可填写 `#`
- `images`：该项目目录下的图片文件名列表

---

## 如何修改 Visit Website 链接

打开 `js/main.js`，找到对应项目的 `url` 字段：

```js
{ id: "project01", title: "网站01", url: "#", images: ["1.webp", "2.webp"] }
```

把 `#` 改成真实网址即可：

```js
{ id: "project01", title: "网站01", url: "https://example.com", images: ["1.webp", "2.webp"] }
```

如果 `url` 仍然是 `#`，Visit Website 按钮会自动显示为禁用状态，避免用户误点空链接。

---

## 如何修改样式

所有自定义样式都在：

```bash
css/style.css
```

可以在这里修改：

- 页面背景色
- 卡片圆角和阴影
- 图片高度
- 卡片文字样式
- Visit Website 按钮样式
- 移动端布局
- 卡片 hover 效果

---

## 如何修改脚本

所有项目数据和主要交互逻辑都在：

```bash
js/main.js
```

可以在这里维护：

- 项目列表
- 项目图片数组
- Visit Website 链接
- 卡片渲染结构
- Swiper 初始化参数
- Fancybox 配置

---

## 页面展示逻辑

页面加载后会根据 `projects` 数组自动生成案例卡片。每张卡片包含：

- 项目截图轮播
- Case 编号
- 项目标题
- 项目截图数量说明
- 点击图片查看大图提示
- Visit Website 按钮

图片轮播采用进入视口后再初始化的方式，避免一次性加载全部轮播内容，有利于页面性能。

---

## 部署方式

### 本地预览

直接用浏览器打开 `index.html` 即可预览。

如果浏览器对本地资源加载有限制，建议使用 VS Code 的 Live Server 或其他本地服务器工具。

### 静态部署

可以部署到：

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- 普通虚拟主机
- WordPress 自定义 HTML 页面或模板目录

---

## 后续可扩展方向

后续如果需要继续增强，可以考虑增加：

- 分类筛选
- 关键词搜索
- 项目标签
- Featured 标记
- 项目详情弹窗
- 独立案例详情页
- 客户评价模块
- WordPress 自定义文章类型接入

---

## 维护建议

- 图片资源统一放在 `images/` 目录
- 每个项目单独使用一个文件夹，例如 `project01`、`project02`
- 每个项目的图片文件名建议保持数字命名，例如 `1.webp`、`2.webp`
- 新增项目时优先修改 `js/main.js` 中的配置，不要直接复制 HTML 卡片
- 样式统一维护在 `css/style.css`
- 第三方库文件不要随意修改，避免影响 Swiper 或 Fancybox 功能

