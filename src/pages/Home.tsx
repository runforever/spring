import { useState, useMemo } from "react";
import StarfieldBackground from "@/sections/StarfieldBackground";
import TopBar from "@/sections/TopBar";
import HeroBanner from "@/sections/HeroBanner";
import SearchBox from "@/sections/SearchBox";
import ToolGrid from "@/sections/ToolGrid";
import Muyu from "@/components/Muyu";
import { toolCategories, allTools } from "@/data/tools";
import { useClickTracker } from "@/hooks/useClickTracker";
import type { ToolCategory } from "@/data/tools";
import { SearchX, Sparkles } from '@/components/Icons';

// Default popular tools — preset based on general popularity
// In a real multi-user scenario, this would come from a backend API
const DEFAULT_POPULAR_IDS = [
  "ai-chatgpt",
  "ai-claude",
  "dev-json",
  "design-figma",
  "eff-notion",
  "ai-midjourney",
  "design-unsplash",
  "eff-excalidraw",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { counts, handleClick } = useClickTracker();

  // Build "Most Popular" category — merged default + user clicks
  // Strategy: start with default popular tools, merge with user's local clicks,
  // re-sort by click count. This gives a reasonable default for new users
  // while personalizing for returning users.
  const popularCategory: ToolCategory | null = useMemo(() => {
    // Merge default IDs with user's clicked IDs
    const allIds = new Set([...DEFAULT_POPULAR_IDS, ...Object.keys(counts)]);

    // Sort by click count (defaults get count=1 so they show up)
    const sorted = Array.from(allIds)
      .map((id) => ({
        id,
        count: counts[id] || 1, // default tools start with count=1
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const popularTools = sorted
      .map(({ id }) => allTools.find((t) => t.id === id))
      .filter((t): t is NonNullable<typeof t> => t !== undefined);

    if (popularTools.length === 0) return null;

    return {
      title: "最受欢迎",
      tools: popularTools,
    };
  }, [counts]);

  const filteredCategories = useMemo(() => {
    let categories = [...toolCategories];

    if (!searchQuery.trim()) {
      // No search: show popular first, then ALL normal categories (no dedup)
      if (popularCategory) {
        return [popularCategory, ...categories];
      }
      return categories;
    }

    // With search query: just filter normally
    const query = searchQuery.toLowerCase().trim();
    return categories
      .map((category) => ({
        ...category,
        tools: category.tools.filter((tool) => {
          const searchText = `${tool.name} ${tool.description} ${tool.category} ${tool.iconText}`.toLowerCase();
          return searchText.includes(query);
        }),
      }))
      .filter((category) => category.tools.length > 0);
  }, [searchQuery, popularCategory]);

  const hasResults = filteredCategories.length > 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          '-apple-system, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
        position: "relative",
      }}
    >
      <StarfieldBackground />
      <TopBar />
      <HeroBanner />
      <SearchBox value={searchQuery} onChange={setSearchQuery} />

      {hasResults ? (
        <ToolGrid
          categories={filteredCategories}
          onTrackClick={handleClick}
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            position: "relative",
            zIndex: 10,
            padding: "80px 24px",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full mb-4"
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <SearchX size={28} color="rgba(255, 255, 255, 0.2)" />
          </div>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "20px",
            }}
          >
            未找到与 "{searchQuery}" 相关的工具
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200"
            style={{
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              color: "#a78bfa",
              fontSize: "13px",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              cursor: "pointer",
            }}
          >
            <Sparkles size={14} />
            清除搜索
          </button>
        </div>
      )}

      {/* 电子木鱼 */}
      <Muyu />

      {/* Footer */}
      <footer
        className="flex items-center justify-center"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.2)",
          }}
        >
          工具宇宙 · 共收录 {allTools.length} 个精选工具 · 持续更新中
        </p>
      </footer>
    </div>
  );
}
