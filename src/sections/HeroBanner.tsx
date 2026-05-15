import { useState, useEffect } from "react";

const words = ["AI 工具", "开发者利器", "设计资源", "效率神器"];

export default function HeroBanner() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typeSpeed = isDeleting ? 50 : 120;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((p) => (p + 1) % words.length);
        }
      }
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "440px", zIndex: 10, marginTop: "48px" }}
    >
      {/* Pixel galaxy background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/galaxy-pixel.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,6,18,0.3) 0%, rgba(4,6,18,0.5) 50%, rgba(4,6,18,0.7) 100%)",
        }}
      />

      {/* ═══════ 3 ELEMENTS ONLY: Black Hole + Wandering Earth + Rocket ═══════ */}

      {/* ── 1. Black Hole (Interstellar tribute) ──
          Top-right corner. Static (no rotation). Subtle glow pulse. */}
      <div
        className="absolute"
        style={{
          width: "100px",
          height: "100px",
          top: "6%",
          right: "5%",
          opacity: 0.65,
          animation: "glowPulse 5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        <img
          src="/blackhole.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated",
            filter: "drop-shadow(0 0 16px rgba(251,146,60,0.3))",
          }}
        />
      </div>

      {/* ── 2. Wandering Earth ──
          Upper-left area, slow horizontal drift. Blue engine trail. */}
      <div
        className="absolute"
        style={{
          width: "55px",
          height: "55px",
          top: "12%",
          left: "8%",
          animation: "earthDrift 28s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        <img
          src="/wandering-earth.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated",
            filter: "drop-shadow(0 0 10px rgba(59,130,246,0.25))",
          }}
        />
        {/* Subtle engine trail */}
        <div
          className="absolute"
          style={{
            width: "40px",
            height: "2px",
            top: "50%",
            right: "75%",
            transform: "translateY(-50%)",
            background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)",
            borderRadius: "1px",
            animation: "trailFade 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── 3. Pixel Rocket ──
          Bottom-right corner, very slow rise + settle. */}
      <img
        src="/rocket-pixel.png"
        alt=""
        className="absolute"
        style={{
          width: "38px",
          height: "auto",
          bottom: "10%",
          right: "10%",
          opacity: 0.5,
          imageRendering: "pixelated",
          animation: "rocketHover 16s ease-in-out infinite",
          pointerEvents: "none",
          filter: "drop-shadow(0 0 6px rgba(251,191,36,0.3))",
        }}
      />

      {/* Subtle pixel stars */}
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: "2px",
              height: "2px",
              backgroundColor: "#fff",
              left: `${[15, 30, 55, 70, 85, 40, 60, 25, 90, 5, 45, 78][i]}%`,
              top: `${[10, 25, 8, 40, 18, 60, 35, 50, 30, 70, 15, 55][i]}%`,
              opacity: 0,
              animation: `subtleTwinkle ${3 + (i % 3)}s ease-in-out infinite ${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animations — small, subtle */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 16px rgba(251,146,60,0.25)); }
          50% { filter: drop-shadow(0 0 16px rgba(251,146,60,0.4)); }
        }
        @keyframes earthDrift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(12px, -6px); }
          66% { transform: translate(-4px, 8px); }
        }
        @keyframes trailFade {
          0%, 100% { opacity: 0.6; transform: translateY(-50%) scaleX(1); }
          50% { opacity: 0.25; transform: translateY(-50%) scaleX(0.6); }
        }
        @keyframes rocketHover {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          30% { transform: translate(-4px, -10px) rotate(-2deg); }
          60% { transform: translate(3px, -6px) rotate(1deg); }
        }
        @keyframes subtleTwinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* ── Content ── */}
      <div className="relative flex flex-col items-center" style={{ zIndex: 2 }}>
        {/* Badge */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#4ade80",
              boxShadow: "0 0 8px #4ade80",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.5px" }}>
            已收录 26 个精选工具
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-center"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-1px",
            lineHeight: 1.15,
            margin: 0,
            textShadow: "0 0 60px rgba(100,140,255,0.4), 0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          探索无限
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            工具宇宙
          </span>
        </h1>

        {/* Typing subtitle */}
        <div className="mt-5" style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", height: "28px", fontFamily: "monospace" }}>
          {displayText}
          <span style={{ color: "#60a5fa", opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}>|</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "20px" }}>
          {[
            { label: "AI 工具", count: "6" },
            { label: "开发工具", count: "6" },
            { label: "设计资源", count: "6" },
            { label: "效率神器", count: "6" },
            { label: "小游戏", count: "2" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>{s.count}</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
