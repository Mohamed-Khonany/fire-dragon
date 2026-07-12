import { SkillBadge } from "./skillBadge";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  icon: IconType;
  color: string; // brand color, kept per-icon so the badge still reads at a glance
}

interface Category {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export function SkillCard({ title, icon: HeaderIcon, skills }: Category) {
  return (
    <div
      className="
        skill-card rounded-2xl border border-white/10
        bg-linear-to-b from-white/4 to-white/1
        p-6 mx-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
        transition-colors duration-300 hover:border-white/15
      "
    >
      <div className="mb-5 flex items-center gap-2">
        <HeaderIcon className="h-4 w-4 text-orange-400" strokeWidth={2} />
        <h3 className="text-sm font-medium text-zinc-300">{title}</h3>
      </div>

      <div className="grid grid-cols-3 gap-x-3 gap-y-5">
        {skills.map((skill, i) => (
          <SkillBadge key={`${skill.name}-${i}`} index={i} {...skill} />
        ))}
      </div>
    </div>
  );
}
