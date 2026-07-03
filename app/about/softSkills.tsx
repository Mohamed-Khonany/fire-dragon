"use client";

import {
  Search,
  Lightbulb,
  Users,
  MessageSquare,
  Clock,
  RefreshCw,
  ShieldCheck,
  Crown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────
interface Trait {
  label: string;
  icon: LucideIcon;
}

const TRAITS: Trait[] = [
  { label: "Attention to detail", icon: Search },
  { label: "Problem-solving", icon: Lightbulb },
  { label: "Team collaboration", icon: Users },
  { label: "Stakeholder Communication", icon: MessageSquare },
  { label: "Time management", icon: Clock },
  { label: "Adaptability", icon: RefreshCw },
  { label: "Ownership", icon: ShieldCheck },
  { label: "Leadership", icon: Crown },
];

// ─────────────────────────────────────────────
// TraitCard
// ─────────────────────────────────────────────
function TraitCard({ label, icon: Icon, index }: Trait & { index: number }) {
  return (
    <div
      className="trait-card group relative flex flex-col items-center justify-center gap-5 rounded-2xl border border-white/[0.07] bg-[#1a1a1a] px-6 py-10 cursor-default select-none overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-orange-500/40
        hover:bg-[#1e1c1a]
        hover:shadow-[0_0_0_1px_rgba(249,115,22,0.2),0_8px_32px_rgba(249,115,22,0.12)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Subtle radial glow behind icon on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(249,115,22,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Icon */}
      <div className="relative flex items-center justify-center">
        <Icon
          className="h-8 w-8 text-orange-500 transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-orange-400 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.7)]"
          strokeWidth={1.5}
        />
      </div>

      {/* Label */}
      <p className="relative text-center text-sm font-semibold leading-snug text-zinc-200 transition-colors duration-300 group-hover:text-white">
        {label}
      </p>

      {/* Bottom accent line — slides up on hover */}
      <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ease-out group-hover:w-12" />
    </div>
  );
}

// ─────────────────────────────────────────────
// ForgeCharacter (default export)
// ─────────────────────────────────────────────
export default function SoftSkills() {
  return (
    <section className="relative w-full bg-[#070708] px-6 py-20 md:px-14">
      {/* Section heading */}
      <div className="mb-12 flex flex-col items-center gap-2">
        <h2 className="text-lg font-bold uppercase tracking-[0.3em]">
          <span className="text-zinc-200">Soft </span>
          <span className="text-orange-500">Skills</span>
        </h2>
        <span className="h-[2px] w-14 rounded-full bg-orange-500" />
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
