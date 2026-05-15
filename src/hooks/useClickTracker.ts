import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tool_clicks";

export function getClickCounts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export function recordClick(toolId: string) {
  const counts = getClickCounts();
  counts[toolId] = (counts[toolId] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
}

export function useClickTracker() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setCounts(getClickCounts());
  }, []);

  const handleClick = useCallback((toolId: string) => {
    recordClick(toolId);
    setCounts(getClickCounts());
  }, []);

  return { counts, handleClick };
}
