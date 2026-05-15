export interface Tool {
  id: string;
  name: string;
  iconText: string;
  description: string;
  category: string;
  url: string;
  isInternal?: boolean;
}

export interface ToolCategory {
  title: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    title: "开发者工具",
    tools: [
      {
        id: "dev-json",
        name: "JSON 格式化",
        iconText: "JSON",
        description: "在线 JSON 格式化、校验、压缩和美化工具",
        category: "格式化",
        url: "/tools/json-formatter",
        isInternal: true,
      },
      {
        id: "dev-regex",
        name: "Regex101",
        iconText: "REGEX",
        description: "在线正则表达式测试和调试工具",
        category: "调试工具",
        url: "https://regex101.com",
      },
      {
        id: "dev-httpie",
        name: "HTTPie",
        iconText: "HTTP",
        description: "用户友好的 API 测试和 HTTP 客户端",
        category: "API 工具",
        url: "https://httpie.io",
      },
      {
        id: "dev-caniuse",
        name: "Can I Use",
        iconText: "CANI",
        description: "查询浏览器对 Web 特性的支持情况",
        category: "兼容性",
        url: "https://caniuse.com",
      },
      {
        id: "dev-codegen",
        name: "QuickType",
        iconText: "TYPE",
        description: "根据 JSON 自动生成各类语言的类型定义代码",
        category: "代码生成",
        url: "https://app.quicktype.io",
      },
      {
        id: "dev-diff",
        name: "DiffChecker",
        iconText: "DIFF",
        description: "在线文本差异对比工具",
        category: "对比工具",
        url: "https://www.diffchecker.com",
      },
    ],
  },
  {
    title: "小游戏",
    tools: [
      {
        id: "game-snake",
        name: "贪食蛇",
        iconText: "SNAKE",
        description: "经典贪食蛇游戏，支持多种模式",
        category: "休闲",
        url: "https://snake.defcoding.com",
      },
      {
        id: "game-jiang",
        name: "汉字组合",
        iconText: "JIANG",
        description: "探索一个汉字笔画能组成多少个新汉字",
        category: "益智",
        url: "https://jiang.defcoding.com",
      },
    ],
  },
  {
    title: "AI 工具箱",
    tools: [
      {
        id: "ai-anime",
        name: "AI 动漫转换",
        iconText: "ANIME",
        description: "将人像照片转换为二次元动漫风格的 AI 工具",
        category: "AI 图像",
        url: "https://www.meitu.com/global/ai-art",
      },
      {
        id: "ai-chatgpt",
        name: "ChatGPT",
        iconText: "GPT",
        description: "OpenAI 出品的人工智能对话助手",
        category: "AI 对话",
        url: "https://chat.openai.com",
      },
      {
        id: "ai-claude",
        name: "Claude",
        iconText: "CLAUDE",
        description: "Anthropic 开发的 AI 助手，擅长长文本处理",
        category: "AI 对话",
        url: "https://claude.ai",
      },
      {
        id: "ai-midjourney",
        name: "Midjourney",
        iconText: "MJ",
        description: "业界领先的 AI 图像生成平台",
        category: "AI 绘图",
        url: "https://www.midjourney.com",
      },
      {
        id: "ai-remove-bg",
        name: "Remove.bg",
        iconText: "REMOVE",
        description: "一键自动去除图片背景的 AI 工具",
        category: "AI 图像",
        url: "https://www.remove.bg",
      },
      {
        id: "ai-upscale",
        name: "Upscayl",
        iconText: "UPSCAL",
        description: "开源 AI 图片无损放大工具",
        category: "AI 图像",
        url: "https://upscayl.org",
      },
    ],
  },
  {
    title: "设计资源",
    tools: [
      {
        id: "design-figma",
        name: "Figma",
        iconText: "FIGMA",
        description: "云端协作界面设计工具的行业标准",
        category: "UI 设计",
        url: "https://www.figma.com",
      },
      {
        id: "design-unsplash",
        name: "Unsplash",
        iconText: "PHOTO",
        description: "高质量免版权摄影图片库",
        category: "图片素材",
        url: "https://unsplash.com",
      },
      {
        id: "design-iconify",
        name: "Iconify",
        iconText: "ICON",
        description: "汇集数百个开源图标集的统一图标库",
        category: "图标",
        url: "https://iconify.design",
      },
      {
        id: "design-font",
        name: "Google Fonts",
        iconText: "FONT",
        description: "Google 提供的免费开源 Web 字体库",
        category: "字体",
        url: "https://fonts.google.com",
      },
      {
        id: "design-mesh",
        name: "BGJar",
        iconText: "MESH",
        description: "在线生成 SVG 渐变背景和图案",
        category: "背景生成",
        url: "https://bgjar.com",
      },
      {
        id: "design-color",
        name: "Coolors",
        iconText: "COLOR",
        description: "配色方案生成器和调色板工具",
        category: "配色",
        url: "https://coolors.co",
      },
    ],
  },
  {
    title: "效率工具",
    tools: [
      {
        id: "eff-todo",
        name: "Todoist",
        iconText: "TODO",
        description: "跨平台任务管理和待办清单工具",
        category: "任务管理",
        url: "https://todoist.com",
      },
      {
        id: "eff-notion",
        name: "Notion",
        iconText: "NOTION",
        description: "集笔记、数据库、 Wiki 于一体的协作平台",
        category: "知识管理",
        url: "https://www.notion.so",
      },
      {
        id: "eff-excalidraw",
        name: "Excalidraw",
        iconText: "DRAW",
        description: "手绘风格的开源在线白板工具",
        category: "白板",
        url: "https://excalidraw.com",
      },
      {
        id: "eff-carbon",
        name: "Carbon",
        iconText: "CODE",
        description: "创建和分享精美的源代码截图",
        category: "代码展示",
        url: "https://carbon.now.sh",
      },
      {
        id: "eff-transform",
        name: "Transform",
        iconText: "SWIFT",
        description: "即时在不同编程语言和数据格式间转换",
        category: "格式转换",
        url: "https://transform.tools",
      },
      {
        id: "eff-explainshell",
        name: "ExplainShell",
        iconText: "SHELL",
        description: "可视化解析和解释 Shell 命令的含义",
        category: "命令行",
        url: "https://explainshell.com",
      },
    ],
  },
];

export const allTools: Tool[] = toolCategories.flatMap((cat) => cat.tools);
