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

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DESKTOP_QUERY } from "../aboutScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────
interface Trait {
  label: string;
  icon: LucideIcon;
}

export const TRAITS: Trait[] = [
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
export function TraitCard({
  label,
  icon: Icon,
  index,
}: Trait & { index: number }) {
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
          const lag = 0.4 + index * 0.25;
          const dur = 0.5 + index * 0.05;

          // desktop = horizontal travel -> skewX + trailing x
          // mobile / tablet = vertical scroll -> skewY (same as the reference)
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
        }
      );

      return () => mm.revert();
    },
    { scope: cardRef, dependencies: [index] }
  );

  return (
    <div
      ref={cardRef}
      className={` relative flex flex-col items-center justify-center gap-5 rounded-2xl border border-white/[0.07] bg-[#1a1a1a] px-6 py-16 md:py-22 cursor-default select-none overflow-hidden
        transition-[translate,border-color,background-color,box-shadow] 
        hover:-translate-y-1
        hover:border-orange-500/40
        hover:bg-[#1e1c1a]
        hover:shadow-[0_0_0_1px_rgba(249,115,22,0.2),0_8px_32px_rgba(249,115,22,0.12)]`}
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