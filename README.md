# 工具宇宙 (Tool Universe)

一个像素风太空主题的第三方工具导航站，以卡片形式展示各类在线工具，支持搜索过滤、点击追踪和内置 JSON 格式化工具。

**在线地址**: https://zj77d2et2wqvc.ok.kimi.link

**仓库地址**: git@github.com:runforever/spring.git

---

## 技术栈

| 层 | 技术 | 版本 |
|----|------|------|
| 框架 | React | 19.2.0 |
| 路由 | react-router | 7.6.1 |
| 构建 | Vite | 7.2.4 |
| 样式 | Tailwind CSS | 3.4.19 |
| 语言 | TypeScript | 5.9.3 |
| JSON 展示 | @uiw/react-json-view | 2.0.0-alpha |
| 代码编辑 | @uiw/react-textarea-code-editor | 3.1.1 |

**不使用 lucide-react**，图标由 `src/components/Icons.tsx` 内联 SVG 实现。

---

## 项目结构

```
├── public/                    # 静态资源（构建时复制到 dist/）
│   ├── galaxy-pixel.jpg       # Banner 银河背景
│   ├── blackhole.png          # Banner 黑洞像素图
│   ├── wandering-earth.png    # Banner 流浪地球像素图
│   └── rocket-pixel.png       # Banner 火箭像素图
│
├── src/
│   ├── main.tsx               # 应用入口（渲染根组件）
│   ├── App.tsx                # 路由配置（仅2个路由）
│   ├── App.css                # 全局样式（滚动条、选中文本等）
│   ├── index.css              # Tailwind CSS 入口
│   │
│   ├── data/
│   │   └── tools.ts           # 工具卡片数据配置
│   │
│   ├── hooks/
│   │   └── useClickTracker.ts # localStorage 点击计数 Hook
│   │
│   ├── components/
│   │   ├── Icons.tsx          # 内联 SVG 图标库（15个图标）
│   │   └── Toast.tsx          # 顶部提示条组件
│   │
│   ├── sections/              # 可复用页面区块
│   │   ├── TopBar.tsx         # 顶部导航栏
│   │   ├── HeroBanner.tsx     # 首页 Banner（像素风太空动画）
│   │   ├── SearchBox.tsx      # 搜索框组件
│   │   ├── ToolCard.tsx       # 单个工具卡片
│   │   ├── ToolGrid.tsx       # 工具卡片网格布局
│   │   └── StarfieldBackground.tsx  # 全屏星空 Canvas 背景
│   │
│   └── pages/                 # 页面级组件
│       ├── Home.tsx           # 首页（导航站主体）
│       └── JsonFormatter.tsx  # JSON 格式化工具页
│
├── package.json
├── vite.config.ts             # Vite 配置（base: './'）
├── tsconfig.json              # TypeScript 配置
├── tailwind.config.js         # Tailwind 配置
├── postcss.config.js          # PostCSS 配置
├── index.html                 # HTML 入口
├── RELEASE.md                 # 发布流程文档
└── README.md                  # 本文档
```

---

## 路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 工具导航站首页 |
| `/tools/json-formatter` | JsonFormatter | JSON 格式化/压缩/转义工具 |

`BrowserRouter` 在 `main.tsx` 中提供，`Routes` 在 `App.tsx` 中定义。

---

## 数据配置（核心）

### 工具卡片数据 `src/data/tools.ts`

所有工具卡片在此配置，按分类组织：

```typescript
export interface Tool {
  id: string;           // 唯一标识，用于点击追踪
  name: string;         // 卡片显示名称
  iconText: string;     // 卡片大文字标识（如 "JSON"、"GPT"）
  description: string;  // 卡片描述
  category: string;     // 分类标签（决定颜色）
  url: string;          // 链接地址
  isInternal?: boolean; // true = 站内路由（如 /tools/json-formatter）
}

export interface ToolCategory {
  title: string;        // 分类标题（如 "AI 工具箱"）
  tools: Tool[];
}
```

### 添加新工具卡片

在 `toolCategories` 数组中找到对应分类，在 `tools` 数组中添加新对象：

```typescript
{
  id: "unique-id",          // 小写+连字符
  name: "工具中文名",
  iconText: "SHORT",        // 大写缩写，4-6个字母最佳
  description: "一句话描述",
  category: "分类名",       // 需同步添加到 ToolCard 的 categoryColors
  url: "https://example.com",
}
```

**如果工具是内置页面**（如 JSON 格式化），设置 `isInternal: true`，`url` 写路由路径（如 `/tools/json-formatter`）。

### 添加新分类

1. 在 `toolCategories` 数组末尾新增一个 `ToolCategory` 对象
2. 在 `ToolCard.tsx` 的 `categoryColors` 中添加该分类的颜色映射
3. 如果希望出现在"最受欢迎"默认列表中，在 `Home.tsx` 的 `DEFAULT_POPULAR_IDS` 中添加工具 ID

### 现有分类和颜色

| 分类 | 颜色 |
|------|------|
| AI 图像/对话/绘图 | #f472b6 / #60a5fa / #a78bfa |
| 格式化/调试/API | #34d399 / #fbbf24 / #fb923c |
| UI 设计/图片/图标 | #c084fc / #38bdf8 / #facc15 |
| 任务管理/知识管理 | #2dd4bf / #a78bfa |
| 休闲/益智（游戏） | #f59e0b / #f97316 |

---

## 核心组件说明

### ToolCard 卡片组件

- 玻璃态（glassmorphism）风格：半透明背景 + backdrop-filter 模糊
- **悬停效果**: `scale(1.04)` 放大 + 阴影增强
- **iconText**: 使用 Arial Black 字体的大写英文标识，渐变色
- **category 标签**: 左上角小标签，颜色由 `categoryColors` 映射决定
- 外部链接在新标签页打开（`target="_blank"`），内部链接用 `Link` 组件路由

### Home 首页逻辑

1. **最受欢迎分区**: 合并 `DEFAULT_POPULAR_IDS`（预设热门）和 `localStorage` 中的用户点击记录，按点击数排序，取前10个。展示在所有分类之前。
2. **搜索过滤**: 实时过滤，匹配 `name + description + category + iconText`，不区分大小写
3. **点击追踪**: 通过 `useClickTracker` Hook 记录每个工具的点击次数到 `localStorage`

### JsonFormatter JSON 工具

- **输入区**: `@uiw/react-textarea-code-editor` 代码编辑器，带行号和语法高亮
- **实时语法检查**: 输入时自动检测 JSON 合法性，错误时标红行号
- **智能格式化**: 自动识别转义 JSON（`JSON.stringify` 过的字符串），先去转义再格式化
- **输出区**: `@uiw/react-json-view` 树形折叠展示，带缩进和语法高亮
- **三个功能按钮**: 格式化 / 压缩 / 转义（纵向排列在输入输出中间）

---

## 开发规范

### 样式规范
- 不使用 shadcn/ui 组件（已删除）
- 不使用 lucide-react（改用 `src/components/Icons.tsx`）
- 暗色主题为主，卡片用玻璃态（`backdrop-filter: blur`）
- 颜色使用 `rgba(255, 255, 255, x)` 控制透明度
- 动画过渡使用 `transition: "all 0.25s ease"`

### 图标使用
所有图标从 `Icons.tsx` 导入：
```typescript
import { Search, ArrowLeft, Braces } from '@/components/Icons';

// 使用
<Search size={16} color="#ffffff" />
```

如需新图标，在 `Icons.tsx` 中添加 SVG 组件。

### 添加新页面
1. 在 `src/pages/` 创建新页面组件
2. 在 `App.tsx` 的 `Routes` 中添加路由
3. 在 `tools.ts` 中配置工具卡片，`isInternal: true`，`url` 为路由路径

---

## 构建与发布

### 本地开发
```bash
npm install --legacy-peer-deps
npm run dev
```

### 生产构建
```bash
npm run build
```
输出到 `dist/` 目录。

### 发布流程
详见 `RELEASE.md`，核心三步：
1. develop 分支提交代码 → push
2. develop 分支执行 `npm run build` 生成 dist
3. dist 内容强制覆盖 main 分支 → `git push -f origin main`

---

## 关键文件修改速查

| 需求 | 修改文件 |
|------|----------|
| 添加新工具卡片 | `src/data/tools.ts` |
| 修改卡片颜色 | `src/sections/ToolCard.tsx` → `categoryColors` |
| 添加新分类 | `src/data/tools.ts` + `ToolCard.tsx` |
| 修改最受欢迎默认 | `src/pages/Home.tsx` → `DEFAULT_POPULAR_IDS` |
| 添加新页面/路由 | `src/App.tsx` + `src/pages/` |
| 修改 Banner | `src/sections/HeroBanner.tsx` |
| 修改搜索框 | `src/sections/SearchBox.tsx` |
| 修改星空背景 | `src/sections/StarfieldBackground.tsx` |
| 添加新图标 | `src/components/Icons.tsx` |
| 修改 JSON 工具 | `src/pages/JsonFormatter.tsx` |
| 修改全局样式 | `src/App.css` |

---

## 依赖说明（仅5个）

| 包 | 用途 | 能否移除 |
|----|------|----------|
| react + react-dom | 框架核心 | 不可 |
| react-router | 路由（2个页面） | 不可（除非改单页） |
| @uiw/react-textarea-code-editor | JSON 工具输入区 | 可（需自研编辑器） |
| @uiw/react-json-view | JSON 树形展示 | 可（需自研树形组件） |

如需进一步减小体积，可考虑用原生 `<textarea>` + 自研 JSON 树形组件替换最后两个依赖。
