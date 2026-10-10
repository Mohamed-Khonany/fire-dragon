"use client";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import type { Skill } from "./categories";

gsap.registerPlugin(useGSAP);

/*
 * Rounded-square outline that starts at the top-centre and runs clockwise.
 * viewBox 56 = badge border-box (h-14 w-14), stroke centred on the 1px border.
 * `pathLength=100` lets us use the skill percentage directly as the dash length.
 */
const RING_PATH =
  "M28 1H44A11 11 0 0 1 55 12V44A11 11 0 0 1 44 55H12A11 11 0 0 1 1 44V12A11 11 0 0 1 12 1Z";

const IDLE_BORDER = "rgba(255,255,255,0.1)";
const IDLE_BG = "rgba(255,255,255,0.03)";
const IDLE_GLOW = "0 0 0 0 rgba(249,115,22,0)";

export function SkillBadge({ name, icon: Icon, color, percentage }: Skill) {
  const boxRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);

  const hasPercentage = typeof percentage === "number";
  const pct = Math.min(100, Math.max(0, percentage ?? 0));

  useGSAP(
    () => {
      const box = boxRef.current;
      if (!box) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const counter = { v: 0 };

      gsap.set(box, { borderColor: IDLE_BORDER, backgroundColor: IDLE_BG, boxShadow: IDLE_GLOW });

      const tl = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });

      tl.to(box, {
        y: -5,
        scale: 1.1,
        borderColor: "rgba(251,146,60,0.7)",
        backgroundColor: "rgba(249,115,22,0.06)",
        boxShadow: "0 0 22px 6px rgba(249,115,22,0.35)",
        duration: 0.35,
        ease: "power3.out",
      }).to(iconRef.current, { scale: 1.15, duration: 0.35, ease: "back.out(2)" }, 0);

      if (hasPercentage) {
        gsap.set(ringRef.current, { strokeDashoffset: 100, opacity: 0 });
        gsap.set(tipRef.current, { xPercent: -50, y: 8, scale: 0.85, opacity: 0 });

        tl.to(ringRef.current, { opacity: 1, duration: 0.15 }, 0)
          // the ring stops at `pct` -> the border is intentionally incomplete
          .to(ringRef.current, { strokeDashoffset: 100 - pct, duration: 0.8, ease: "power2.out" }, 0)
          .to(tipRef.current, { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0.05)
          .to(
            counter,
            {
              v: pct,
              duration: 0.8,
              ease: "power2.out",
              onUpdate: () => {
                if (valueRef.current) valueRef.current.textContent = String(Math.round(counter.v));
              },
            },
            0
          );
      }

      if (reduce) tl.timeScale(20);
      tlRef.current = tl;
    },
    { scope: boxRef, dependencies: [pct, hasPercentage] }
  );

  const open = () => tlRef.current?.play();
  const close = () => tlRef.current?.reverse();

  return (
    <div
      className="skill-badge relative flex flex-col items-center gap-2 outline-none"
      role="group"
      aria-label={hasPercentage ? `${name}, ${pct}%` : name}
      tabIndex={0}
      onPointerEnter={(e) => e.pointerType !== "touch" && open()}
      onPointerLeave={(e) => e.pointerType !== "touch" && close()}
      onPointerDown={(e) => {
        // touch devices have no hover: tap toggles
        if (e.pointerType !== "touch") return;
        openRef.current = !openRef.current;
        openRef.current ? open() : close();
      }}
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && open()}
      onBlur={() => {
        openRef.current = false;
        close();
      }}
    >
      {hasPercentage && (
        <div
          ref={tipRef}
          role="tooltip"
          className="pointer-events-none absolute -top-9 left-1/2 z-30 whitespace-nowrap rounded-md border border-orange-400/40 bg-zinc-900/95 px-2 py-1 text-[11px] font-semibold tabular-nums text-orange-300 shadow-lg"
        >
          <span ref={valueRef}>0</span>%
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-orange-400/40 bg-zinc-900" />
        </div>
      )}

      <div
        ref={boxRef}
        className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/3"
      >
        {hasPercentage && (
          <svg
            aria-hidden="true"
            viewBox="0 0 56 56"
            className="pointer-events-none absolute -inset-px h-14 w-14 text-orange-400"
            style={{ filter: "drop-shadow(0 0 4px rgba(249,115,22,0.7))" }}
          >
            <path
              ref={ringRef}
              d={RING_PATH}
              pathLength={100}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray={100}
              strokeDashoffset={100}
            />
          </svg>
        )}

        <span ref={iconRef} className="flex">
          <Icon className="h-7 w-7" style={{ color }} aria-hidden="true" />
        </span>
      </div>

      <span className="max-w-22 text-center text-[11px] leading-tight text-zinc-400">
        {name}
      </span>
    </div>
  );
}