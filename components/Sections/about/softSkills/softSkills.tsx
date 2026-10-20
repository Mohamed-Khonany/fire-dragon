"use client";
import { FireSpan } from "@/components/UI/fireSpan/fire";
import { TraitCard, TRAITS } from "./TraitCart";
import GradientText from "@/components/UI/fireSpan/gradientText";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DESKTOP_QUERY } from "../aboutScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─────────────────────────────────────────────
// ForgeCharacter (default export)
// ─────────────────────────────────────────────
export default function SoftSkills() {
  const [row1, row2] = [TRAITS.slice(0, 4), TRAITS.slice(4)];

  console.log(row1);
  console.log(row2);

  
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: DESKTOP_QUERY,
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as Record<string, boolean>;
          if (!motion) return;

          // later cards trail more, like `lag: (i) => i * 0.5` in the reference
          const lag = 0.4 + 6 * 0.25;
          const dur = 0.5 + 6 * 0.05;

          // desktop = horizontal travel -> skewX + trailing x
          // mobile / tablet = vertical scroll -> skewY (same as the reference)
          const toSkew = gsap.quickTo(card, desktop ? "skewX" : "skewY", {
            duration: dur,
            ease: "power3.out",
          });
          const toLag = desktop
            ? gsap.quickTo(card, "x", {
                duration: dur + 0.2,
                ease: "power3.out",
              })
            : null;

          const clampSkew = gsap.utils.clamp(-20, 20);
          const clampLag = gsap.utils.clamp(-80, 80);

          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              // page scroll speed drives the horizontal track
              const v = self.getVelocity();
              toSkew(clampSkew(v / -40)); // flip the sign (v / 40) if the lean looks wrong
              toLag?.(clampLag((v / 25) * lag));
            },
          });

          const settle = () => {
            toSkew(0);
            toLag?.(0);
          };
          ScrollTrigger.addEventListener("scrollEnd", settle);
          return () => ScrollTrigger.removeEventListener("scrollEnd", settle);
        },
      );

      return () => mm.revert();
    },
    { scope: cardRef },
  );

  return (
    <div className="relative w-full px-6 py-20 md:pl-40 md:pr-12">
      <div className="relative flex flex-col items-center justify-between gap-20 lg:flex-row lg:gap-28">
        {/* Section heading */}
        <div
          ref={cardRef}
          className="flex flex-col items-center gap-4 lg:[writing-mode:vertical-rl] lg:rotate-180 rotate-0" 
        >
          <h1 className="text-center text-3xl font-semibold uppercase tracking-[0.35em] text-zinc-300">
            Soft <GradientText inline={true}>Skills</GradientText>
          </h1>
          <span className="h-0.5 w-28 rounded-full bg-linear-to-r from-primary-container to-secondary lg:h-28 lg:w-0.5 lg:bg-linear-to-b" />
        </div>
        {/* 4-col grid */}
        {/* <div className="mx-auto relative w-screen grid grid-cols-2 gap-4 md:grid-cols-4"> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 mx-auto max-w-7xl lg:w-screen text-3xl ">
          {TRAITS.map((trait, i) => (
            <TraitCard key={trait.label} index={i} {...trait} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .trait-card {
            animation: forgeFadeUp 0.45s ease-out both;
          }
        }
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
      `}</style>
    </div>
  );
}
