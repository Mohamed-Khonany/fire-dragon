"use client";
import { FireSpan } from "@/components/UI/fireSpan/fire";
import { TraitCard, TRAITS } from "./TraitCart";

// ─────────────────────────────────────────────
// ForgeCharacter (default export)
// ─────────────────────────────────────────────
export default function SoftSkills() {
  return (
    <section className="relative w-full px-6 py-20 md:px-14">
      {/* Section heading */}
      <div className="mb-10 flex flex-col items-center gap-2">
        <h1 className="text-center text-lg font-semibold uppercase tracking-[0.35em] text-zinc-300">
          Soft <FireSpan>Skills</FireSpan>
        </h1>
        <span className="h-0.5 w-24 rounded-full bg-linear-to-r from-primary-container to-secondary" />
      </div>

      {/* 4-col grid */}
      <div className="mx-auto max-w-5xl grid grid-cols-2 gap-4 md:grid-cols-4">
        {TRAITS.map((trait, i) => (
          <TraitCard key={trait.label} index={i} {...trait} />
        ))}
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
