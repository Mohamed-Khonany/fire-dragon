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

/** Types  */
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

/** Data  */
export const EDUCATION: EducationEntry = {
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

export function CourseTag({
  label,
  icon: Icon,
  index,
}: Course & { index: number }) {
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
