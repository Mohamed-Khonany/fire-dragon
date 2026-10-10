import type { CSSProperties } from "react";

import { SkillBadge } from "./skillBadge";
import type { Category } from "./categories";

/*
 * Layers (so GSAP animations never fight over one transform):
 *  - .forge-card-wrap -> scroll entrance
 *  - .skill-card      -> hover: scale + 3D tilt + magnetic move (set in TechnicalForge)
 *  - .skill-depth     -> content layer pushed forward in Z + counter-parallax
 *  - .skill-glare     -> light spot that follows the cursor
 */
export function SkillCard({ title, icon: HeaderIcon, skills }: Category) {
  return (
    <div className="forge-card-wrap h-full ">
      <div
        className="
          skill-card relative h-full rounded-2xl border border-white/10
          bg-linear-to-b from-white/4 to-white/1 p-5 sm:p-6
          will-change-transform
        "
      >
        <div className="skill-depth relative">
          <div className="mb-5 flex items-center gap-2">
            <HeaderIcon className="h-4 w-4 text-orange-400" strokeWidth={2} />
            <h3 className="text-sm font-medium text-zinc-300">{title}</h3>
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            {skills.map((skill, i) => (
              <SkillBadge key={`${skill.name}-${i}`} {...skill} />
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="skill-glare pointer-events-none absolute inset-0 rounded-2xl opacity-0"
          style={
            {
              "--mx": "50%",
              "--my": "50%",
              background:
                "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.14), transparent 45%)",
            } as CSSProperties
          }
        />
      </div>
    </div>
  );
}