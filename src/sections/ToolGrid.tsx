import type { ToolCategory } from "@/data/tools";
import ToolCard from "./ToolCard";

interface ToolGridProps {
  categories: ToolCategory[];
  onTrackClick?: (toolId: string) => void;
}

export default function ToolGrid({ categories, onTrackClick }: ToolGridProps) {
  return (
    <div
      className="flex flex-col items-center"
      style={{
        padding: "0 24px 80px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        {categories.map((category, catIndex) => (
          <div key={catIndex} style={{ marginBottom: "48px" }}>
            {/* Category title */}
            <div
              className="flex items-center gap-3"
              style={{ marginBottom: "24px" }}
            >
              {/* Decorative line */}
              <div
                style={{
                  width: "4px",
                  height: "20px",
                  borderRadius: "2px",
                  background:
                    "linear-gradient(180deg, #3b82f6, #8b5cf6)",
                }}
              />
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "rgba(255, 255, 255, 0.9)",
                  margin: 0,
                  letterSpacing: "-0.3px",
                }}
              >
                {category.title}
              </h2>
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.25)",
                  marginLeft: "4px",
                }}
              >
                {category.tools.length} 个工具
              </span>
            </div>

            {/* Cards grid */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {category.tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onTrackClick={onTrackClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
