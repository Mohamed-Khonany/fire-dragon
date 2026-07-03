"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, ArrowLeft, Flame, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import AnimatedBanner from "@/components/animated-path/animated-banner";

// ─────────────────────────────────────────────
// Glitch text hook — randomly scrambles chars
// ─────────────────────────────────────────────
const GLITCH_CHARS = "!@#$%^&*<>?/|\\[]{}~";

function useGlitch(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            i < frame / 2
              ? char
              : Math.random() > 0.55
                ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                : char,
          )
          .join(""),
      );
      frame++;
      if (frame > text.length * 2) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [active, text]);

  return display;
}

// ─────────────────────────────────────────────
// Animated 404 digits
// ─────────────────────────────────────────────
function GlitchDigits() {
  const [glitching, setGlitching] = useState(false);
  const label = useGlitch("404", glitching);

  useEffect(() => {
    // auto-trigger once on mount
    const t = setTimeout(() => setGlitching(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (glitching) {
      const t = setTimeout(() => setGlitching(false), 1400);
      return () => clearTimeout(t);
    }
  }, [glitching]);

  return (
    <div
      className="relative select-none cursor-default"
      onMouseEnter={() => setGlitching(true)}
    >
      {/* Main number */}
      <span
        className="block text-[9rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #f97316 0%, #ea580c 40%, #c2410c 100%)",
          filter: glitching
            ? "drop-shadow(0 0 24px rgba(249,115,22,0.9))"
            : "drop-shadow(0 0 10px rgba(249,115,22,0.4))",
          transition: "filter 0.2s ease",
        }}
      >
        {label}
      </span>

      {/* Glitch clone layers */}
      {glitching && (
        <>
          <span
            className="absolute inset-0 block text-[9rem] md:text-[13rem] font-black leading-none tracking-tighter text-orange-300/30 pointer-events-none"
            style={{
              transform: "translate(-3px, 1px)",
              clipPath: "inset(20% 0 60% 0)",
            }}
            aria-hidden
          >
            404
          </span>
          <span
            className="absolute inset-0 block text-[9rem] md:text-[13rem] font-black leading-none tracking-tighter text-red-400/20 pointer-events-none"
            style={{
              transform: "translate(3px, -1px)",
              clipPath: "inset(60% 0 10% 0)",
            }}
            aria-hidden
          >
            404
          </span>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Terminal-style detail line
// ─────────────────────────────────────────────
const LINES = [
  { text: "resolving route...", type: "info" },
  { text: "scanning forge index...", type: "info" },
  { text: "error: 404 — path not found", type: "error" },
  { text: "suggestion: return to /home", type: "hint" },
] as const;

type LineType = "info" | "error" | "hint";

const LINE_COLORS: Record<LineType, string> = {
  info: "text-zinc-400",
  error: "text-red-400",
  hint: "text-orange-300",
};

const PROMPT_COLORS: Record<LineType, string> = {
  info: "text-orange-500",
  error: "text-red-500",
  hint: "text-orange-400",
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

function TerminalBlock() {
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
    <div
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
          forge_router.sh
        </span>
      </div>

      {/* ── Lines ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5 min-h-[80px]">
        {LINES.map((line, i) => (
          <TypewriterLine
            key={line.text}
            text={line.text}
            type={line.type}
            startDelay={[300, 800, 1300, 1800][i]}
            run={run}
          />
        ))}
      </div>

      {/* ── Blinking cursor on last line after done ─────────────────────── */}
      <p
        className="font-mono text-xs text-orange-500/50 mt-1"
        style={{
          animation: "termBlink 1s step-start infinite",
          animationDelay: `${lastLineDelay}ms`,
          opacity: 0,
        }}
      >
        █
      </p>

      {/* ── Bottom status bar ──────────────────────────────────────────── */}
      <div
        className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0.4 }}
      >
        <span className="font-mono text-[9px] text-zinc-600 tracking-wider">
          STATUS: <span className="text-red-400">ERR_404</span>
        </span>
        <span className="font-mono text-[9px] text-zinc-600 tracking-wider">
          {hovered ? (
            <span className="text-orange-400 animate-pulse">● REPLAYING</span>
          ) : (
            <span>HOVER TO REPLAY</span>
          )}
        </span>
      </div>

      <style jsx global>{`
        @keyframes termBlink {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// NotFound page
// ─────────────────────────────────────────────
export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#070708] flex flex-col items-center justify-center px-6">
      {/* ── Background radial glow ──────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 48%, rgba(180,60,0,0.13) 0%, rgba(120,35,0,0.06) 50%, transparent 75%)",
        }}
      />

      {/* ── Grid texture overlay ────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 z-0">
        <AnimatedBanner isHome={false} />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center gap-4 text-center transition-all duration-700 md:pt-24"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
        }}
      >
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/6 px-4 ">
          <Terminal className="h-3.5 w-3.5 text-orange-500" strokeWidth={2} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
            Page not found
          </span>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <span className="h-px flex-1 bg-white/[0.06]" />
          <Flame className="h-4 w-4 text-orange-500/60" />
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* 404 glitch number */}
        <GlitchDigits />

        {/* Heading & sub-copy */}
        <div className="flex flex-col gap-1 max-w-md">
          {/* <h1 className="text-xl font-bold text-zinc-100 md:text-2xl">
            This page left the <span className="text-orange-500">Forge</span>
          </h1> */}
          <p className="text-sm leading-relaxed text-zinc-400">
            The route you're looking for doesn't exist, was moved, or was never
            forged in the first place.
          </p>
        </div>

        {/* Terminal lines */}
        <TerminalBlock />

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/[0.08] px-6 py-3 text-sm font-semibold text-orange-400 transition-all duration-300 hover:-translate-y-[2px] hover:border-orange-400/70 hover:bg-orange-500/[0.14] hover:text-orange-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.25)]"
          >
            <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Back to Home
          </Link>

          <button
            onClick={() => router.back()}
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-400 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/20 hover:text-zinc-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Go Back
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes forgeFadeUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </main>
  );
}
