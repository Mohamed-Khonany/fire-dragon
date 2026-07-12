import type { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
  color: string; // brand color, kept per-icon so the badge still reads at a glance
}

export function SkillBadge({
  name,
  icon: Icon,
  color,
  index,
}: Skill & { index: number }) {
  return (
    <div
      className="skill-badge group flex flex-col items-center gap-2 outline-none"
      style={{ animationDelay: `${index * 45}ms` }}
      tabIndex={0}
    >
      <div
        className="
          relative flex h-14 w-14 items-center justify-center rounded-xl
          border border-white/10 bg-white/[0.03]
          transition-all duration-300 ease-out
          group-hover:-translate-y-1 group-hover:scale-[1.08]
          group-hover:border-orange-400/70 group-hover:bg-orange-500/[0.06]
          group-hover:shadow-[0_0_0_1px_rgba(251,146,60,0.4),0_0_22px_6px_rgba(249,115,22,0.35)]
          group-focus-visible:-translate-y-1 group-focus-visible:scale-[1.08]
          group-focus-visible:border-orange-400/70 group-focus-visible:bg-orange-500/[0.06]
          group-focus-visible:shadow-[0_0_0_1px_rgba(251,146,60,0.4),0_0_22px_6px_rgba(249,115,22,0.35)]
        "
      >
        <Icon
          className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
          style={{ color }}
        />
      </div>
      <span
        className="
          max-w-[5.5rem] text-center text-[11px] leading-tight text-zinc-400
          transition-colors duration-300
          group-hover:text-orange-300 group-focus-visible:text-orange-300
        "
      >
        {name}
      </span>
    </div>
  );
}