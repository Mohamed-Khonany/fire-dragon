"use client";
import { useEffect, useState } from "react";

// Glitch text hook — randomly scrambles chars
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

// Animated 404 digits
export default function GlitchDigits() {
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
