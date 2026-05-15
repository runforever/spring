import { Search } from '@/components/Icons';
import { useState, useRef } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-center" style={{ marginTop: "28px", marginBottom: "40px" }}>
      <div
        className="flex items-center gap-3 px-6 cursor-text transition-all duration-300"
        onClick={() => inputRef.current?.focus()}
        style={{
          width: "720px",
          maxWidth: "90vw",
          height: "64px",
          borderRadius: "18px",
          background: focused
            ? "linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25))"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
          border: focused
            ? "1px solid rgba(139, 92, 246, 0.5)"
            : "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: focused
            ? "0 0 0 3px rgba(139, 92, 246, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 4px 24px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Search
          size={22}
          style={{
            color: focused ? "#a78bfa" : "rgba(255, 255, 255, 0.35)",
            transition: "color 0.3s",
            flexShrink: 0,
          }}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="搜索工具名称、描述或分类..."
          className="bg-transparent border-none outline-none flex-1"
          style={{
            fontSize: "17px",
            color: "#ffffff",
            caretColor: "#8b5cf6",
            fontFamily: '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif',
            letterSpacing: "0.3px",
          }}
        />
        {value && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "none",
              cursor: "pointer",
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "12px",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
