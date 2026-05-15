import { useState } from "react";
import { Link } from "react-router";
import type { Tool } from "@/data/tools";
import { ExternalLink } from "@/components/Icons";

interface ToolCardProps {
  tool: Tool;
  onTrackClick?: (toolId: string) => void;
}

const categoryColors: Record<string, string> = {
  "AI 图像": "#f472b6",
  "AI 对话": "#60a5fa",
  "AI 绘图": "#a78bfa",
  "格式化": "#34d399",
  "调试工具": "#fbbf24",
  "API 工具": "#fb923c",
  "兼容性": "#2dd4bf",
  "代码生成": "#a3e635",
  "对比工具": "#f87171",
  "UI 设计": "#c084fc",
  "图片素材": "#38bdf8",
  "图标": "#facc15",
  "字体": "#4ade80",
  "背景生成": "#818cf8",
  "配色": "#f472b6",
  "任务管理": "#2dd4bf",
  "知识管理": "#a78bfa",
  "白板": "#fbbf24",
  "代码展示": "#34d399",
  "格式转换": "#fb923c",
  "命令行": "#60a5fa",
  "休闲": "#f59e0b",
  "益智": "#f97316",
};

/** Category icons — inline SVG */
function CategoryIcon({ category, color, size = 20 }: { category: string; color: string; size?: number }) {
  const icons: Record<string, React.ReactNode> = {
    "AI 图像": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><path d="m9 9 3 3"/><path d="m12 12 3-3"/><path d="m15 9 3 3"/></svg>
    ),
    "AI 对话": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M9 9h6"/><path d="M9 13h4"/></svg>
    ),
    "AI 绘图": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2.5 2.24 0 .46.62.8 1.21.9A5.998 5.998 0 0 0 12 12c0-1.6-.66-3.05-1.72-4.11"/><path d="M12 12a5.998 5.998 0 0 0 8.99 6.21c.59-.1 1.21-.44 1.21-.9 0-.72-2.5-.91-2.5-2.24 0-1.67-1.34-3.02-3-3.02"/><circle cx="12" cy="12" r="3"/></svg>
    ),
    "格式化": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M8 12h8"/><path d="M8 8h.01"/><path d="M8 16h.01"/></svg>
    ),
    "调试工具": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M18 13h4"/><path d="M17.47 9c1.93-.2 3.47-1.9 3.47-4"/><path d="M15 6h-4"/><circle cx="12" cy="20" r="2"/></svg>
    ),
    "API 工具": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    ),
    "兼容性": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
    ),
    "代码生成": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    "对比工具": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 21h-8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/><path d="M6 21h8"/><path d="M6 3h8"/><path d="M6 21V3"/></svg>
    ),
    "UI 设计": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
    ),
    "图片素材": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    ),
    "图标": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
    ),
    "字体": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
    ),
    "背景生成": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
    ),
    "配色": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
    ),
    "任务管理": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ),
    "知识管理": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
    ),
    "白板": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    ),
    "代码展示": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/><path d="M9 6h6"/></svg>
    ),
    "格式转换": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
    ),
    "命令行": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
    ),
    "休闲": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M6 12h.01"/><path d="M10 12h.01"/><circle cx="12" cy="12" r="2"/><path d="M18 12h.01"/></svg>
    ),
    "益智": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
  };

  return <>{icons[category] || icons["命令行"]}</>;
}

export default function ToolCard({ tool, onTrackClick }: ToolCardProps) {
  const [hovered, setHovered] = useState(false);
  const accentColor = categoryColors[tool.category] || "#60a5fa";

  const cardContent = (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{
        borderRadius: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: hovered
          ? "0 8px 32px rgba(0, 0, 0, 0.4)"
          : "0 2px 12px rgba(0, 0, 0, 0.15)",
        cursor: "pointer",
        padding: "20px",
        minHeight: "150px",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        willChange: "transform",
      }}
    >
      {/* Top row: category tag + icon + external link */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <CategoryIcon category={tool.category} color={accentColor} size={14} />
          <span
            className="inline-block px-2 py-0.5 rounded"
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: accentColor,
              backgroundColor: `${accentColor}15`,
              letterSpacing: "0.5px",
            }}
          >
            {tool.category}
          </span>
        </div>

        <ExternalLink
          size={14}
          style={{
            color: "rgba(255, 255, 255, 0.2)",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Icon + text */}
      <div className="flex items-center gap-3" style={{ marginBottom: "12px" }}>
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: "44px",
            height: "44px",
            minWidth: "44px",
            backgroundColor: `${accentColor}10`,
            border: `1px solid ${accentColor}25`,
          }}
        >
          <CategoryIcon category={tool.category} color={accentColor} size={22} />
        </div>
        <span
          className="select-none"
          style={{
            fontFamily: '"Arial Black", "Helvetica Neue", sans-serif',
            fontSize: "28px",
            fontWeight: 900,
            background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor}66)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            wordBreak: "break-all",
          }}
        >
          {tool.iconText}
        </span>
      </div>

      {/* Bottom info */}
      <div>
        <span
          className="block"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.9)",
            lineHeight: 1.4,
            marginBottom: "4px",
          }}
        >
          {tool.name}
        </span>
        <span
          className="block"
          style={{
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.4)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tool.description}
        </span>
      </div>
    </div>
  );

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const handleClick = () => {
    if (onTrackClick) onTrackClick(tool.id);
  };

  if (tool.isInternal) {
    return (
      <Link
        to={tool.url}
        className="block no-underline"
        style={{ textDecoration: "none" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline"
      style={{ textDecoration: "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {cardContent}
    </a>
  );
}
