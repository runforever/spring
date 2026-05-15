import { useState, useCallback, useEffect, useRef } from "react";

interface FloatingText {
  id: number;
  x: number;
}

const STORAGE_KEY = "muyu_count";

function getStoredCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function saveCount(count: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(count));
  } catch {
    // ignore
  }
}

export default function Muyu() {
  const [count, setCount] = useState(getStoredCount);
  const [clicked, setClicked] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const idRef = useRef(0);

  const handleClick = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    saveCount(newCount);
    setClicked(true);
    setTimeout(() => setClicked(false), 150);

    const newId = ++idRef.current;
    setFloatingTexts((prev) => [
      ...prev,
      { id: newId, x: (Math.random() - 0.5) * 40 },
    ]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== newId));
    }, 1200);
  }, [count]);

  useEffect(() => {
    setCount(getStoredCount());
  }, []);

  return (
    <div
      className="fixed flex flex-col items-center gap-2 select-none"
      style={{
        bottom: "20px",
        right: "20px",
        zIndex: 100,
      }}
    >
      {/* Count display */}
      <div
        className="flex items-center gap-1.5 px-3 py-1 rounded-full"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(10px)",
        }}
      >
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          功德
        </span>
        <span
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#fbbf24",
            fontFamily: "monospace",
            minWidth: "32px",
            textAlign: "center",
          }}
        >
          {count.toLocaleString()}
        </span>
      </div>

      {/* Muyu button with image */}
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center rounded-2xl cursor-pointer"
        style={{
          width: "88px",
          height: "88px",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          outline: "none",
          transform: clicked ? "scale(0.93)" : "scale(1)",
          transition: "transform 0.12s ease, box-shadow 0.2s",
          boxShadow: clicked
            ? "0 0 30px rgba(251, 191, 36, 0.35)"
            : "0 4px 20px rgba(0, 0, 0, 0.25)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.boxShadow =
            "0 0 25px rgba(251, 191, 36, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(0, 0, 0, 0.25)";
        }}
      >
        {/* Mallet strike animation */}
        <img
          src="/muyu.png?v=2"
          alt="木鱼"
          draggable={false}
          style={{
            width: "68px",
            height: "68px",
            objectFit: "contain",
            imageRendering: "pixelated",
            opacity: clicked ? 0.85 : 1,
            transition: "opacity 0.1s",
            // Mallet strike rotation on click
            transform: clicked
              ? "rotate(-8deg) scale(0.96)"
              : "rotate(0deg) scale(1)",
            transitionProperty: "transform, opacity",
            transitionDuration: "0.12s",
            transitionTimingFunction: "ease",
          }}
        />

        {/* Shock ring on click */}
        {clicked && (
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "60px",
              height: "60px",
              border: "2px solid rgba(251, 191, 36, 0.4)",
              animation: "muyuRing 0.4s ease-out forwards",
            }}
          />
        )}

        {/* Floating "功德+1" texts */}
        {floatingTexts.map((t) => (
          <div
            key={t.id}
            className="absolute pointer-events-none whitespace-nowrap"
            style={{
              top: "-6px",
              left: "50%",
              transform: `translateX(calc(-50% + ${t.x}px))`,
              animation: "muyuFloat 1.2s ease-out forwards",
              fontSize: "14px",
              fontWeight: 700,
              color: "#fbbf24",
              textShadow: "0 0 10px rgba(251, 191, 36, 0.6)",
            }}
          >
            功德+1
          </div>
        ))}
      </button>

      {/* Label */}
      <span
        style={{
          fontSize: "10px",
          color: "rgba(255, 255, 255, 0.25)",
          letterSpacing: "2px",
        }}
      >
        点击敲木鱼
      </span>

      <style>{`
        @keyframes muyuFloat {
          0% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          40% { opacity: 0.9; transform: translateX(-50%) translateY(-28px) scale(1.15); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-52px) scale(0.75); }
        }
        @keyframes muyuRing {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
