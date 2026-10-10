"use client";
import { FireSpan } from "@/components/UI/fireSpan/fire";
import { TraitCard, TRAITS } from "./TraitCart";
import GradientText from "@/components/UI/fireSpan/gradientText";
import { useRef } from "react";

// ─────────────────────────────────────────────
// ForgeCharacter (default export)
// ─────────────────────────────────────────────
export default function SoftSkills() {

  const titleRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative w-full px-6 py-20 md:px-14">
      <div className="flex flex-row items-center justify-between gap-44">
        {/* Section heading */}
        <div
          ref={titleRef}
          className="flex flex-col items-center gap-4 lg:[writing-mode:vertical-rl] lg:rotate-180"
        >
          <h1 className="text-center text-3xl  font-semibold uppercase tracking-[0.35em] text-zinc-300">
            Soft <GradientText inline={true}>Skills</GradientText>
          </h1>
          <span className="h-0.5 w-28 rounded-full bg-linear-to-r from-primary-container to-secondary lg:h-28 lg:w-0.5 lg:bg-linear-to-b" />
        </div>
        {/* 4-col grid */}
        {/* <div className="mx-auto relative w-screen grid grid-cols-2 gap-4 md:grid-cols-4"> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mx-auto w-screen text-3xl ">
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
    </section>
  );
}
