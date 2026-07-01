"use client";

import {
  GitBranch,
  Database,
  Code2,
  Cpu,
  Network,
  FunctionSquare,
  Layers,
  Monitor,
  FlaskConical,
  Box,
  Workflow,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * ---------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------------
 */
interface Course {
  label: string;
  icon: LucideIcon;
}

interface EducationEntry {
  degree: string;
  institution: string;
  graduatedYear: string;
  coursework: Course[];
}

/**
 * ---------------------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------------------
 */
const EDUCATION: EducationEntry = {
  degree: "Bachelor of Science, Computer Science",
  institution: "Faculty of Science, Cairo University",
  graduatedYear: "2024",
  coursework: [
    { label: "Data Structures", icon: GitBranch },
    { label: "Databases", icon: Database },
    { label: "Programming Fundamentals", icon: Code2 },
    { label: "Algorithms", icon: Cpu },
    { label: "Distributed Systems", icon: Network },
    { label: "Linear Algebra", icon: FunctionSquare },
    { label: "Software Development", icon: Layers },
    { label: "Operating Systems", icon: Monitor },
    { label: "Simulation", icon: FlaskConical },
    { label: "OOP", icon: Box },
    { label: "Logic Design", icon: Workflow },
    { label: "Cryptography", icon: Lock },
  ],
};

/**
 * ---------------------------------------------------------------------------
 * CourseTag — pill badge with icon, matching the forge hover language
 * ---------------------------------------------------------------------------
 */
function CourseTag({ label, icon: Icon, index }: Course & { index: number }) {
  return (
    <span
      className="course-tag group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 md:p-3 p-1.5  md:text-sm text-xs font-medium text-zinc-400 cursor-default select-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-500/50 hover:bg-orange-500/6 hover:text-orange-300 hover:shadow-[0_0_14px_2px_rgba(249,115,22,0.15)]"
      style={{ animationDelay: `${120 + index * 40}ms` }}
    >
      <Icon
        className="h-3 w-3 shrink-0 text-orange-500 transition-transform duration-300 group-hover:scale-125 group-hover:text-orange-400"
        strokeWidth={2}
      />
      {label}
    </span>
  );
}

/**
 * ---------------------------------------------------------------------------
 * Education — full section with heading + card
 * ---------------------------------------------------------------------------
 */
export default function Education() {
  const { degree, institution, graduatedYear, coursework } = EDUCATION;

  return (
    <section className="relative w-full bg-[#070708] px-6 py-20 md:px-14">
      {/* ── Section heading ──────────────────────────────────────────────── */}
      <div className="mb-10 flex flex-col items-center gap-2">
        <h2 className="text-md font-bold uppercase tracking-[0.35em] text-zinc-200">
          Education
        </h2>
        <span className="h-[2px] w-40 rounded-full bg-orange-500" />
      </div>

      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <div className="edu-card mx-auto max-w-6xl rounded-2xl border border-white/[0.08] bg-[#0f0e0d] p-10 transition-all duration-500 hover:border-orange-500/20 hover:shadow-[0_0_40px_rgba(249,115,22,0.07)]">
        {/* Degree row */}
        <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:text-3xl text-2xl font-semibold text-zinc-100">
          <div>
            <h3 className="font-bold text-zinc-100">{degree}</h3>
            <p className="mt-0.5 md:text-xl text-lg text-orange-400/80">
              {institution}
            </p>
          </div>
          <span className="mt-2 flex gap-1 shrink-0 text-lg text-zinc-400 md:mt-0">
            Graduated&nbsp;
            <span className="font-semibold text-zinc-200">{graduatedYear}</span>
          </span>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-white/[0.06]" />

        {/* Coursework */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Relevant Coursework
          </p>
          <div className="flex flex-wrap gap-2">
            {coursework.map((course, i) => (
              <CourseTag key={course.label} index={i} {...course} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .edu-card {
            animation: forgeFadeUp 0.5s ease-out both;
          }
          .course-tag {
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
