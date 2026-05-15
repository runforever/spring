import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router";
import CodeEditor from "@uiw/react-textarea-code-editor/nohighlight";
import { JsonView } from "@uiw/react-json-view";
import { lightTheme } from "@uiw/react-json-view/light";
import StarfieldBackground from "@/sections/StarfieldBackground";
import Toast from "@/components/Toast";
import {
  ArrowLeft, Braces, Maximize2, Minimize2, RotateCcw,
  Copy, Check, Trash2, FileJson, Sparkles,
} from '@/components/Icons';

function posToLineCol(text: string, pos: number) {
  let line = 1, col = 1;
  for (let i = 0; i < pos && i < text.length; i++) {
    if (text[i] === "\n") { line++; col = 1; } else { col++; }
  }
  return { line, col };
}

function checkJson(text: string) {
  try {
    JSON.parse(text);
    return { valid: true as const };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "JSON 语法错误";
    const m = msg.match(/position (\d+)/);
    const pos = m ? parseInt(m[1], 10) : 0;
    const { line, col } = posToLineCol(text, pos);
    return { valid: false as const, message: msg, line, col };
  }
}

/**
 * Smart parse: detects escaped JSON and auto-decodes it.
 * Returns { data, wasEscaped } where wasEscaped indicates if auto-unescape happened.
 */
function smartParse(text: string): { data: unknown; wasEscaped: boolean } {
  const trimmed = text.trim();

  // Case 1: Direct JSON parse (normal case)
  try {
    const parsed = JSON.parse(trimmed);
    // If parsed is an object/array, it's normal JSON
    if (parsed !== null && typeof parsed === "object") {
      return { data: parsed, wasEscaped: false };
    }
    // If parsed is a string, it might be escaped JSON (JSON.stringify'd)
    if (typeof parsed === "string") {
      try {
        const inner = JSON.parse(parsed);
        return { data: inner, wasEscaped: true };
      } catch {
        return { data: parsed, wasEscaped: false };
      }
    }
    // Primitive value (number, boolean)
    return { data: parsed, wasEscaped: false };
  } catch {
    // Direct parse failed
  }

  // Case 2: Wrapped in quotes (double-stringified JSON)
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      const unescaped = JSON.parse(trimmed);
      if (typeof unescaped === "string") {
        const inner = JSON.parse(unescaped);
        return { data: inner, wasEscaped: true };
      }
    } catch {
      // Fall through
    }
  }

  // Case 3: Raw escaped string without outer quotes
  // e.g. {\"name\": \"Alice\"}
  try {
    const unescaped = trimmed
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .replace(/\\b/g, "\b")
      .replace(/\\f/g, "\f");
    const inner = JSON.parse(unescaped);
    return { data: inner, wasEscaped: true };
  } catch {
    // Fall through
  }

  throw new Error("无法解析为有效的 JSON");
}

// ── LineNumbers ──
function LineNumbers({ count, highlightLine, scrollRef }: {
  count: number; highlightLine?: number;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const numRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scrollRef?.current || !numRef.current) return;
    const el = scrollRef.current, numEl = numRef.current;
    const handler = () => { numEl.scrollTop = el.scrollTop; };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [scrollRef]);

  return (
    <div ref={numRef} style={{
      width: "48px", minWidth: "48px", backgroundColor: "#f3f4f6",
      borderRight: "1px solid #e5e7eb", color: "#9ca3af", fontSize: "12px",
      lineHeight: "22px", textAlign: "right", paddingRight: "10px",
      overflow: "hidden", fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
    }}>
      {Array.from({ length: Math.max(count, 1) }, (_, i) => {
        const hl = highlightLine && i + 1 === highlightLine;
        return (
          <div key={i} style={hl ? { color: "#dc2626", fontWeight: 700, backgroundColor: "#fee2e2" } : undefined}>
            {i + 1}
          </div>
        );
      })}
    </div>
  );
}

// ── Main ──
export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [parsed, setParsed] = useState<unknown>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState<{ message: string; line: number; col: number } | null>(null);

  const inputScrollRef = useRef<HTMLDivElement>(null);
  const outputScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!input.trim()) { setError(null); return; }
    const r = checkJson(input);
    if (r.valid) setError(null);
    else setError({ message: r.message, line: r.line, col: r.col });
  }, [input]);

  const showToast = useCallback((msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 2000);
  }, []);

  // Smart format: auto-detect escaped JSON
  const handleFormat = useCallback(() => {
    try {
      if (!input.trim()) { showToast("请输入 JSON 内容"); return; }
      const { data, wasEscaped } = smartParse(input);
      setOutput(JSON.stringify(data, null, indentSize));
      setParsed(data);
      showToast(wasEscaped ? "已自动去转义并格式化" : "格式化成功");
    } catch (err) {
      showToast(`格式化失败: ${err instanceof Error ? err.message : "无效 JSON"}`);
    }
  }, [input, indentSize, showToast]);

  const handleMinify = useCallback(() => {
    try {
      if (!input.trim()) { showToast("请输入 JSON 内容"); return; }
      const { data } = smartParse(input);
      setOutput(JSON.stringify(data));
      setParsed(null);
      showToast("压缩成功");
    } catch (err) {
      showToast(`压缩失败: ${err instanceof Error ? err.message : "无效 JSON"}`);
    }
  }, [input, showToast]);

  const handleEscape = useCallback(() => {
    if (!input.trim()) { showToast("请输入 JSON 内容"); return; }
    const escaped = JSON.stringify(input.trim());
    setOutput(escaped); setParsed(null);
    showToast("转义成功");
  }, [input, showToast]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {
      const ta = document.createElement("textarea");
      ta.value = output; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true); showToast("已复制到剪贴板");
    setTimeout(() => setCopied(false), 1500);
  }, [output, showToast]);

  const handleClear = useCallback(() => {
    setInput(""); setOutput(""); setParsed(null); setError(null);
  }, []);

  const handleLoadExample = useCallback(() => {
    const ex = { users: [{ id: 1, name: "Alice", active: true, score: 95.5 }, { id: 2, name: "Bob", active: false, score: 82.0 }], meta: { version: "2.0", count: 2, nested: { deep: { value: null } } } };
    const t = JSON.stringify(ex);
    setInput(t);
    setOutput(JSON.stringify(ex, null, 2));
    setParsed(ex); setError(null);
  }, []);

  const inputLines = useMemo(() => input ? input.split("\n").length : 1, [input]);
  const outputLines = useMemo(() => output ? output.split("\n").length : 1, [output]);

  const cardStyle = (borderRed?: boolean): React.CSSProperties => ({
    borderRadius: "14px", border: `1px solid ${borderRed ? "#fca5a5" : "#e5e7eb"}`,
    backgroundColor: "#fafafa", overflow: "hidden", display: "flex", flexDirection: "column",
    flex: 1, minWidth: 0,
    boxShadow: borderRed ? "0 0 0 1px #fca5a5, 0 1px 3px rgba(0,0,0,0.04)" : "0 1px 3px rgba(0,0,0,0.04)",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  const headerStyle: React.CSSProperties = {
    height: "40px", backgroundColor: "#f3f4f6", borderBottom: "1px solid #e5e7eb",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 14px", flexShrink: 0,
  };

  const jsonViewStyle = useMemo(() => ({
    ...lightTheme, background: "transparent",
    fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace', fontSize: "13px", lineHeight: "22px",
  }), []);

  return (
    <div style={{ minHeight: "100vh", position: "relative",
      fontFamily: '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
      <StarfieldBackground />
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast({ message: "", visible: false })} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-5"
        style={{ height: "48px", backgroundColor: "rgba(4,6,18,0.8)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)", zIndex: 50 }}>
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: "none", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
          <ArrowLeft size={15} /> 返回首页
        </Link>
        <div className="flex items-center gap-2">
          <Braces size={15} color="#34d399" />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>JSON 格式化工具</span>
        </div>
        <div style={{ width: "60px" }} />
      </nav>

      <div style={{ paddingTop: "48px", position: "relative", zIndex: 10, height: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Sub header */}
        <div className="flex items-center justify-between" style={{ padding: "14px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>缩进</span>
            {[2, 4].map(n => (
              <button key={n} onClick={() => setIndentSize(n)}
                style={{ padding: "2px 8px", borderRadius: "6px", fontSize: "11px",
                  fontWeight: indentSize === n ? 700 : 400,
                  color: indentSize === n ? "#34d399" : "rgba(255,255,255,0.35)",
                  backgroundColor: indentSize === n ? "rgba(52,211,153,0.12)" : "transparent",
                  border: indentSize === n ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer" }}>{n}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleLoadExample} style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>加载示例</button>
            <button onClick={handleClear} className="flex items-center gap-1" style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>
              <Trash2 size={11} /> 清空
            </button>
          </div>
        </div>

        {/* Three-column area */}
        <div className="flex" style={{ flex: 1, minHeight: 0, padding: "16px 20px 20px", gap: "12px" }}>

          {/* ── Left: Input ── */}
          <div style={cardStyle(!!error)} data-color-mode="light">
            <div style={headerStyle}>
              <div className="flex items-center gap-2">
                <FileJson size={13} color="#6b7280" />
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#4b5563" }}>输入</span>
                {error && <span style={{ fontSize: "11px", color: "#dc2626" }}>第 {error.line} 行, 第 {error.col} 列</span>}
              </div>
              <span style={{ fontSize: "11px", color: "#9ca3af" }}>{input.length.toLocaleString()} 字符 · {inputLines} 行</span>
            </div>
            <div className="flex" style={{ flex: 1, minHeight: 0 }}>
              <LineNumbers count={inputLines} highlightLine={error?.line} scrollRef={inputScrollRef} />
              <div ref={inputScrollRef} style={{ flex: 1, overflow: "auto" }}>
                <CodeEditor value={input} language="json" placeholder="在此粘贴 JSON 内容，支持自动识别转义 JSON..."
                  onChange={(evn) => setInput(evn.target.value)} padding={16}
                  style={{ fontSize: 13, fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
                    backgroundColor: "#fafafa", color: "#1f2937", minHeight: "100%" }} />
              </div>
            </div>
            {error && (
              <div style={{ padding: "6px 14px", backgroundColor: "#fef2f2", borderTop: "1px solid #fecaca",
                fontSize: "11px", color: "#dc2626", flexShrink: 0 }}>
                <span style={{ fontWeight: 600 }}>第 {error.line} 行, 第 {error.col} 列:</span>{" "}{error.message}
              </div>
            )}
          </div>

          {/* ── Middle: Buttons (3 buttons, no unescape) ── */}
          <div className="flex flex-col items-center justify-center" style={{ width: "80px", minWidth: "80px", gap: "6px" }}>
            {[
              { label: "格式化", icon: <Maximize2 size={13} />, color: "#34d399", action: handleFormat },
              { label: "压缩", icon: <Minimize2 size={13} />, color: "#f59e0b", action: handleMinify },
              { label: "转义", icon: <RotateCcw size={13} />, color: "#8b5cf6", action: handleEscape },
            ].map(btn => (
              <button key={btn.label} onClick={btn.action}
                className="flex flex-col items-center justify-center gap-1"
                style={{ width: "64px", height: "64px", borderRadius: "14px",
                  backgroundColor: `${btn.color}10`, border: `1px solid ${btn.color}30`,
                  color: btn.color, fontSize: "11px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${btn.color}20`; e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${btn.color}10`; e.currentTarget.style.transform = "scale(1)"; }}>
                {btn.icon}<span>{btn.label}</span>
              </button>
            ))}
          </div>

          {/* ── Right: Output (read-only) ── */}
          <div style={cardStyle()}>
            <div style={headerStyle}>
              <div className="flex items-center gap-2">
                <FileJson size={13} color="#6b7280" />
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#4b5563" }}>输出</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "11px", color: "#9ca3af" }}>{output.length.toLocaleString()} 字符 · {outputLines} 行</span>
                {output && (
                  <button onClick={handleCopy} className="flex items-center gap-1"
                    style={{ fontSize: "11px", color: copied ? "#059669" : "#6b7280", background: "none", border: "none", cursor: "pointer", padding: "2px 6px" }}>
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                )}
              </div>
            </div>

            {/* Body: line numbers + read-only JsonView */}
            <div className="flex" style={{ flex: 1, minHeight: 0 }}>
              <LineNumbers count={outputLines} scrollRef={outputScrollRef} />
              <div ref={outputScrollRef} style={{ flex: 1, padding: "10px 14px", overflow: "auto" }}>
                {parsed !== null ? (
                  <JsonView
                    value={parsed as object}
                    style={jsonViewStyle}
                    indentWidth={indentSize * 10}
                    displayObjectSize={true}
                    displayDataTypes={false}
                    enableClipboard={false}
                    collapsed={false}
                  />
                ) : output ? (
                  <pre style={{ margin: 0, padding: 0, fontSize: "13px", lineHeight: "22px",
                    fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace', color: "#1f2937" }}>
                    {output}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center" style={{ height: "100%", color: "#d1d5db" }}>
                    <Sparkles size={28} color="#e5e7eb" />
                    <span style={{ fontSize: "12px", marginTop: "8px" }}>结果将在此显示</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
