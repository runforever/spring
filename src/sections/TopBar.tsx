export default function TopBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6"
      style={{
        height: "48px",
        backgroundColor: "rgba(4, 6, 18, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: "28px",
            height: "28px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <span
          className="font-bold"
          style={{
            fontSize: "15px",
            color: "#ffffff",
            letterSpacing: "-0.3px",
          }}
        >
          工具宇宙
        </span>
      </div>

      {/* Right side avatar */}
      <div
        className="rounded-full"
        style={{
          width: "28px",
          height: "28px",
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          cursor: "pointer",
        }}
      />
    </nav>
  );
}
