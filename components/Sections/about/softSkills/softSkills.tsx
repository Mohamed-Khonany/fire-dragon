"use client";
import { useContext, useMemo, useRef, type CSSProperties } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { TraitCard, TRAITS } from "./TraitCart";
import GradientText from "@/components/UI/fireSpan/gradientText";
import { AboutScrollContext, DESKTOP_QUERY } from "../aboutScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Zigzag tuning (desktop) ─────────────────────────────
const CARD_W = 300;      // card width
const CARD_H = 340;      // card height
const BASE_GAP = 360;    // first gap between two top-row cards (> CARD_W)
const GAP_STEP = 70;     // each following gap grows by this much
const BOTTOM_Y = 200;    // bottom row drop; < CARD_H, so the rows overlap vertically

function buildZigzag(count: number) {
  const topCount = Math.ceil(count / 2);

  // left edge of every top-row card, with gaps that keep widening
  const topLeft: number[] = [0];
  for (let j = 0; j < topCount; j++) {
    topLeft.push(topLeft[j] + CARD_W + BASE_GAP + j * GAP_STEP);
  }

  const positions = Array.from({ length: count }, (_, k) => {
    const j = Math.floor(k / 2);
    if (k % 2 === 0) return { x: topLeft[j], y: 0 };
    // bottom card sits exactly in the middle of the gap under top[j] and top[j+1]
    const gap = BASE_GAP + j * GAP_STEP;
    return { x: topLeft[j] + (CARD_W + gap) / 2, y: BOTTOM_Y };
  });

  const width = Math.max(...positions.map((p) => p.x)) + CARD_W;
  const height = BOTTOM_Y + CARD_H;
  return { positions, width, height };
}

export default function SoftSkills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const horizontalTween = useContext(AboutScrollContext);

  const layout = useMemo(() => buildZigzag(TRAITS.length), []);

  // ── Heading: skew / trail with scroll velocity (unchanged) ──
  useGSAP(
    () => {
      const card = headingRef.current;
      if (!card) return;

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: DESKTOP_QUERY, motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as Record<string, boolean>;
          if (!motion) return;

          const lag = 0.4 + 6 * 0.25;
          const dur = 0.5 + 6 * 0.05;

          const toSkew = gsap.quickTo(card, desktop ? "skewX" : "skewY", {
            duration: dur,
            ease: "power3.out",
          });
          const toLag = desktop
            ? gsap.quickTo(card, "x", { duration: dur + 0.2, ease: "power3.out" })
            : null;

          const clampSkew = gsap.utils.clamp(-20, 20);
          const clampLag = gsap.utils.clamp(-80, 80);

          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              const v = self.getVelocity();
              toSkew(clampSkew(v / -40));
              toLag?.(clampLag((v / 25) * lag));
            },
          });

          const settle = () => {
            toSkew(0);
            toLag?.(0);
          };
          ScrollTrigger.addEventListener("scrollEnd", settle);
          return () => ScrollTrigger.removeEventListener("scrollEnd", settle);
        }
      );
      return () => mm.revert();
    },
    { scope: headingRef }
  );

  // ── Cards: reveal each one as it enters from the right (desktop only) ──
  useGSAP(
    () => {
      const grid = gridRef.current;
      // horizontalTween is null on mobile/tablet -> cards just stay visible
      if (!grid || !horizontalTween) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".trait-card", grid).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: i % 2 ? 90 : -90, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: gridRef, dependencies: [horizontalTween] }
  );

  return (
    <div className="relative w-full px-6 py-20 md:pl-40 md:pr-12 lg:flex lg:w-max lg:items-center lg:gap-28 lg:py-0 lg:pr-40">
      {/* Section heading */}
      <div
        ref={headingRef}
        className="mb-16 flex flex-col items-center gap-4 rotate-0 lg:mb-0 lg:rotate-180 lg:[writing-mode:vertical-rl]"
      >
        <h1 className="text-center text-3xl font-semibold uppercase tracking-[0.35em] text-zinc-300">
          Soft <GradientText inline={true}>Skills</GradientText>
        </h1>
        <span className="h-0.5 w-28 rounded-full bg-linear-to-r from-primary-container to-secondary lg:h-28 lg:w-0.5 lg:bg-linear-to-b" />
      </div>

      {/* Mobile/tablet: 2-col grid. Desktop: absolute zigzag. */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:relative lg:block lg:h-(--h) lg:w-(--w)"
        style={{ "--w": `${layout.width}px`, "--h": `${layout.height}px` } as CSSProperties}
      >
        {TRAITS.map((trait, i) => (
          <div
            key={trait.label}
            className="trait-card-slot h-72 lg:absolute lg:left-(--x) lg:top-(--y) lg:h-(--ch) lg:w-(--cw)"
            style={
              {
                "--x": `${layout.positions[i].x}px`,
                "--y": `${layout.positions[i].y}px`,
                "--cw": `${CARD_W}px`,
                "--ch": `${CARD_H}px`,
              } as CSSProperties
            }
          >
            <TraitCard index={i} {...trait} />
          </div>
        ))}
      </div>
    </div>
  );
}