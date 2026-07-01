"use client";

import { Sparkles, Hexagon, Zap, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * ---------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------------
 */
interface PhilosophyCard {
  icon: LucideIcon;
  quote: string;
}

/**
 * ---------------------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------------------
 */
const PHILOSOPHY_CARDS: PhilosophyCard[] = [
  {
    icon: Sparkles,
    quote: '"I push every project until it feels fully polished."',
  },
  {
    icon: Hexagon,
    quote: '"I take ownership from UI design through backend integration."',
  },
  {
    icon: Zap,
    quote: '"I translate complex technical needs into smooth user experiences."',
  },
  {
    icon: Users,
    quote:
      '"I collaborate closely with stakeholders to ensure every pixel serves a purpose."',
  },
];

/**
 * ---------------------------------------------------------------------------
 * PhilosophyCard — single quote card with left orange border + icon
 * ---------------------------------------------------------------------------
 */
function PhilosophyCard({ icon: Icon, quote, index }: PhilosophyCard & { index: number }) {
  return (
    <div
      className="philosophy-card group relative flex cursor-default items-center gap-5 overflow-hidden rounded-lg border border-white/[0.07] bg-[#111114] px-10 py-8 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-orange-500/40 hover:bg-[#131316] hover:shadow-[0_0_28px_4px_rgba(249,115,22,0.12)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Left orange accent bar */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] rounded-r-full bg-orange-500 transition-all duration-300 group-hover:shadow-[0_0_10px_2px_rgba(249,115,22,0.7)]"
      />

      {/* Icon */}
      <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <Icon
          className="h-8 w-8 text-orange-500 transition-colors duration-300 group-hover:text-orange-400"
          strokeWidth={1.5}
        />
      </div>

      {/* Quote */}
      <p className="text-sm font-normal leading-relaxed text-zinc-300 transition-colors duration-300 group-hover:text-zinc-100 md:text-[15px]">
        {quote}
      </p>
    </div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * PhilosophyOfTheForge — 2×2 grid section
 * ---------------------------------------------------------------------------
 */
export default function PhilosophyOfTheForge() {
  return (
    <section className="relative w-full bg-[#0a0a0c] px-6 py-16 md:px-14">
      {/* Section heading */}
      <h2 className="mb-10 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">
        Philosophy of the{" "}
        <span className="text-orange-500">Forge</span>
      </h2>

      {/* 2 × 2 grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PHILOSOPHY_CARDS.map((card, i) => (
          <PhilosophyCard key={i} index={i} {...card} />
        ))}
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .philosophy-card {
            animation: forgeSlideUp 0.45s ease-out both;
          }
        }

        @keyframes forgeSlideUp {
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