import { isValidElement, type ElementType, type ReactNode } from "react";
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
import { Path } from "@/components/UI/animated-path/animated-path";

type TraitCardProps = {
  index: number;
  label: string;
  icon?: ReactNode | ElementType;
  description?: string;
};

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

export function TraitCard({ index, label, icon, description }: TraitCardProps) {
  const Icon = icon as ElementType | undefined;

  return (
    <div className="trait-card group relative h-full w-full">
      {/* coloured glow that wakes up on hover */}
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-linear-to-br from-primary-container/40 to-secondary/30 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-4xl border border-white/20 p-8
                   backdrop-blur-2xl backdrop-saturate-150
                   shadow-[0_10px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(255,255,255,0.08)]
                   transition-[transform,border-color] duration-500 ease-out
                   group-hover:-translate-y-3 group-hover:border-white/40"
      >
        {/* soft specular highlight (top-left) */}
        <span className="pointer-events-none absolute -left-1/3 -top-1/3 h-2/3 w-full rotate-12 bg-linear-to-b from-white/30 to-transparent opacity-40 blur-2xl" />

        {/* shine sweep on hover */}
        <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[400%]" />

        {/* top row: icon + index */}
        <div className="relative flex items-start justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-md">
            {isValidElement(icon) ? (
              icon
            ) : Icon ? (
              <Icon className="h-8 w-8" />
            ) : null}
          </div>
          <span className="text-5xl font-extrabold tabular-nums text-white/10 transition-colors duration-500 group-hover:text-white/25">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* bottom: label + description */}
        <div className="relative">
          <h3 className="text-md font-semibold uppercase tracking-[0.2em] text-zinc-100">
            {label}
          </h3>
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-300/80">
              {description}
            </p>
          )}
          <span className="mt-5 block h-px w-full bg-linear-to-r from-primary-container via-secondary to-transparent opacity-70" />
        </div>
      </div>
    </div>
  );
}
