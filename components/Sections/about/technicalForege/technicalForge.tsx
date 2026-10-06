"use client";

import { FireSpan } from "@/components/UI/fireSpan/fire";
import { CATEGORIES } from "./categories";
import { SkillCard } from "./skillCard";
import GradientText from "@/components/UI/fireSpan/gradientText";

export default function TechnicalForge() {
  const [row1, row2] = [CATEGORIES.slice(0, 3), CATEGORIES.slice(3)];

  return (
    <div className="pt-16 flex flex-col items-center justify-center">
      
      {/* soft vignette so the cards sit in a pool of light rather than flat black */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(120,60,20,0.08), transparent 70%)",
        }}
      />
      <div className="relative flex flex-row items-center justify-center">
        <div className="mb-10 flex flex-col rotate-270 items-center gap-2">
          <h1 className="text-center text-lg  font-semibold uppercase tracking-[0.35em] text-zinc-300">
            Technical <GradientText inline={true}>Skills</GradientText>
          </h1>
          <span className="h-0.5 w-24 rounded-full bg-linear-to-r from-primary-container to-secondary" />
        </div>

        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-stretch">
            {row1.map((category) => (
              <SkillCard key={category.title} {...category} />
            ))}
          </div>

          <div className="mx-auto grid grid-cols-1 gap-8 md:w-2/3 md:grid-cols-2">
            {row2.map((category) => (
              <SkillCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
