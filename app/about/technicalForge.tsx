"use client";

import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { Code2, Smartphone, List, Wrench } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiExpo,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGithub,
  SiGit,
  SiPostman,
  //   SiGo,
  //   SiPostgresql,
  //   SiFlutter,
  //   SiRedis,
  //   SiGraphql,
  //   SiDocker,
  //   SiAmazonaws,
  //   SiGooglecloud,
  //   SiGithubactions,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa6";

import JavaIcon from "../../assets/images/languageSkills/java.svg";
import NativewindIcon from "../../assets/images/languageSkills/nativewind.svg";
import NativeBaseIcon from "../../assets/images/languageSkills/nativeBase.svg";
import FigmaIcon from "../../assets/images/languageSkills/figma.svg";
import AndroidStudioIcon from "../../assets/images/languageSkills/androidStudio.svg";
import TrelloIcon from "../../assets/images/languageSkills/trello.svg";
import VSCodeIcon from "../../assets/images/languageSkills/vscode.svg";

import Image from "next/image";

/**
 * ---------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------------
 */
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

/**
 * ---------------------------------------------------------------------------
 * Data — mirrors the source layout 1:1, including the repeated "Python"
 * badge that appears in the Languages card in the original screenshot.
 * Swap/rename freely — this is the only place content lives.
 * ---------------------------------------------------------------------------
 */
const CATEGORIES: Category[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "C++", icon: SiCplusplus, color: "#3776AB" },
      { name: "Python", icon: SiPython, color: "#FFD43B" },
      {
        name: "Java",
        icon: () => <Image src={JavaIcon} alt="Java" className="h-11 w-11" />,
        color: "#007396",
      },
      { name: "SQL", icon: FaDatabase, color: "#FFB400" },
    ],
  },
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Framer Motion", icon: SiFramer, color: "#A259FF" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
    ],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    skills: [
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "Expo", icon: SiExpo, color: "#FFFFFF" },
      {
        name: "Nativewind",
        icon: () => (
          <Image src={NativewindIcon} alt="Nativewind" className="h-11 w-11" />
        ),
        color: "#61DAFB",
      },
      {
        name: "NativeBase",
        icon: () => (
          <Image src={NativeBaseIcon} alt="NativeBase" className="h-11 w-11" />
        ),
        color: "#61DAFB",
      },
      //   { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    ],
  },
  {
    title: "Backend",
    icon: List,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#83CD29" },
      { name: "Express", icon: SiExpress, color: "#FFFFFF" },
      { name: "MySQL", icon: SiMysql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#DC382D" },
      //   { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      //   { name: "Docker", icon: SiDocker, color: "#2496ED" },
      //     { name: "AWS", icon: SiAmazonaws, color: "#FFFFFF" },
      //   { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
      //   { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Git", icon: SiGit, color: "#F24E1E" },
      {
        name: "Figma",
        icon: () => <Image src={FigmaIcon} alt="Figma" className="h-8 w-8" />,
        color: "#F24E1E",
      },
      { name: "Postman", icon: SiPostman, color: "#F24E1E" },
      {
        name: "Android Studio",
        icon: () => (
          <Image
            src={AndroidStudioIcon}
            alt="Android Studio"
            className="h-8 w-8"
          />
        ),
        color: "#F24E1E",
      },
      {
        name: "Trello",
        icon: () => <Image src={TrelloIcon} alt="Trello" className="h-8 w-8" />,
        color: "#F24E1E",
      },
      //   { name: "VS Code", icon: () => <Image src={VSCodeIcon} alt="VS Code" className="h-8 w-8" />, color: "#F24E1E" },
    ],
  },
];

/**
 * ---------------------------------------------------------------------------
 * SkillBadge — the icon + label pair. Every badge shares the exact same
 * hover transition (lift, brighten, amber glow) so the interaction feels
 * uniform across the whole grid, regardless of which tool it represents.
 * ---------------------------------------------------------------------------
 */
function SkillBadge({
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

/**
 * ---------------------------------------------------------------------------
 * SkillCard — a titled panel containing a 3-column grid of badges.
 * ---------------------------------------------------------------------------
 */
function SkillCard({ title, icon: HeaderIcon, skills }: Category) {
  return (
    <div
      className="
        skill-card rounded-2xl border border-white/10
        bg-gradient-to-b from-white/[0.04] to-white/[0.01]
        p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
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

/**
 * ---------------------------------------------------------------------------
 * TechnicalForge — top-level section. Row 1 holds three cards
 * (Languages / Frontend / Mobile), row 2 holds two narrower, centered
 * cards (Backend / Tools), matching the source composition.
 * ---------------------------------------------------------------------------
 */
export default function TechnicalForge() {
  const [row1, row2] = [CATEGORIES.slice(0, 3), CATEGORIES.slice(3)];

  return (
    <section className="relative w-full overflow-hidden bg-[#070708] px-6 py-20">
      {/* soft vignette so the cards sit in a pool of light rather than flat black */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(120,60,20,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="mb-14 text-center text-md font-semibold uppercase tracking-[0.35em] text-zinc-300">
          Technical{" "}
          <span className="relative inline-block text-orange-400">
            Forge
            <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-orange-500" />
          </span>
        </h2>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
            {row1.map((category) => (
              <SkillCard key={category.title} {...category} />
            ))}
          </div>

          <div className="mx-auto grid w-full grid-cols-1 gap-6 md:w-2/3 md:grid-cols-2">
            {row2.map((category) => (
              <SkillCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .skill-card {
            animation: forgeFadeUp 0.5s ease-out both;
          }
          .skill-badge {
            animation: forgeFadeUp 0.45s ease-out both;
          }
        }

        @keyframes forgeFadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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
