"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Terminal-style detail line
const LINES = [
  { text: "resolving route...", type: "info" },
  { text: "scanning fire index...", type: "info" },
  { text: "error: 404 — path not found", type: "error" },
  { text: "suggestion: return to /home", type: "hint" },
  { text: "solutions: click on terminal to back /home", type: "solution" },
] as const;

type LineType = "info" | "error" | "hint" | "solution";

const LINE_COLORS: Record<LineType, string> = {
  info: "text-zinc-400",
  error: "text-red-400",
  hint: "text-orange-300",
  solution: "text-green-400",
};

const PROMPT_COLORS: Record<LineType, string> = {
  info: "text-orange-500",
  error: "text-red-500",
  hint: "text-orange-400",
  solution: "text-green-500",
};

function TypewriterLine({
  text,
  type,
  startDelay,
  run,
}: {
  text: string;
  type: LineType;
  startDelay: number;
  run: number; // increment to replay
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, 28);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  if (displayed === "" && !done) return null;

  return (
    <p className={`font-mono text-xs leading-relaxed ${LINE_COLORS[type]}`}>
      <span className={PROMPT_COLORS[type]}>›</span> {displayed}
      {!done && (
        <span className="inline-block w-[6px] h-[11px] bg-orange-500 ml-0.5 align-middle animate-pulse" />
      )}
    </p>
  );
}

export default function TerminalBlock() {
  const [hovered, setHovered] = useState(false);
  const [run, setRun] = useState(0); // bump to replay typewriter
  const [scanPos, setScanPos] = useState(-100); // scan line Y %

  // replay typewriter on hover
  const handleEnter = () => {
    setHovered(true);
    setRun((r) => r + 1);
  };

  // scan-line animation while hovered
  useEffect(() => {
    if (!hovered) {
      setScanPos(-100);
      return;
    }
    setScanPos(-100);
    let pos = -100;
    const iv = setInterval(() => {
      pos += 3;
      setScanPos(pos);
      if (pos > 200) {
        pos = -100;
      }
    }, 16);
    return () => clearInterval(iv);
  }, [hovered]);

  // total typewriter duration ~ 1800ms + last line length * 28ms ≈ 2.3s
  const lastLineDelay = 1800 + LINES[LINES.length - 1].text.length * 28;

  return (
    <Link
      href="/"
      className="relative overflow-hidden rounded-xl border bg-[#0f0e0d] px-5 py-4 text-left w-full max-w-sm cursor-default select-none transition-all duration-300"
      style={{
        borderColor: hovered
          ? "rgba(249,115,22,0.35)"
          : "rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? "0 0 0 1px rgba(249,115,22,0.15), 0 0 28px rgba(249,115,22,0.12)"
          : "none",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Scan line ──────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute left-0 w-full h-8 transition-none"
        style={{
          top: `${scanPos}%`,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(249,115,22,0.06) 40%, rgba(249,115,22,0.10) 50%, rgba(249,115,22,0.06) 60%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* ── Top bar — fake window chrome ───────────────────────────────── */}
      <div className="flex items-center gap-1.5 mb-3 pb-2.5 border-b border-white/[0.06]">
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <span className="h-2 w-2 rounded-full bg-green-500/70" />
        <span className="ml-auto font-mono text-[10px] text-zinc-600 tracking-widest">
          Terminal
        </span>
      </div>

      {/* ── Lines ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5 min-h-[80px]">
        {LINES.map((line, i) => (
          <TypewriterLine
            key={line.text}
            text={line.text}
            type={line.type}
            startDelay={[300, 800, 1300, 1800, 2300][i]}
            run={run}
          />
        ))}
      </div>

      {/* ── Blinking cursor on last line after done ─────────────────────── */}


      {/* ── Bottom status bar ──────────────────────────────────────────── */}
      <div
        className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0.4 }}
      >
        <span className="font-mono text-[9px] text-zinc-200 tracking-wider">
          STATUS: <span className="text-red-400">ERR_404</span>
        </span>
        <span className="font-mono text-[9px] text-zinc-200 tracking-wider">
          {hovered ? (
            <span className="text-orange-400 animate-pulse">● REPLAYING</span>
          ) : (
            <span>HOVER TO REPLAY</span>
          )}
        </span>
      </div>
    </Link>
  );
}
