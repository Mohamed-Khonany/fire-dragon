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

import JavaIcon from "../../../../public/assets/images/languageSkills/java.svg";
import NativewindIcon from "../../../../public/assets/images/languageSkills/nativewind.svg";
import NativeBaseIcon from "../../../../public/assets/images/languageSkills/nativeBase.svg";
import FigmaIcon from "../../../../public/assets/images/languageSkills/figma.svg";
import AndroidStudioIcon from "../../../../public/assets/images/languageSkills/androidStudio.svg";
import TrelloIcon from "../../../../public/assets/images/languageSkills/trello.svg";
import VSCodeIcon from "../../../../public/assets/images/languageSkills/vscode.svg";

import Image from "next/image";

/** Types */
interface Skill {
  name: string;
  icon: IconType;
  color: string; // brand color, kept per-icon so the badge still reads at a glance
  percentage?: number; // optional proficiency percentage
}

interface Category {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

// caregories
export const CATEGORIES: Category[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E",percentage: 90 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" ,percentage: 85},
      { name: "C++", icon: SiCplusplus, color: "#3776AB", percentage: 78 },
      { name: "Python", icon: SiPython, color: "#FFD43B", percentage: 62 },
      {
        name: "Java",
        icon: () => <Image src={JavaIcon} alt="Java" className="h-11 w-11" />,
        color: "#007396",
        percentage: 80,
      },
      { name: "SQL", icon: FaDatabase, color: "#FFB400" ,percentage: 58},
    ],
  },
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB", percentage: 90 },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", percentage: 85 },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", percentage: 80 },
      { name: "Framer Motion", icon: SiFramer, color: "#A259FF", percentage: 75 },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC", percentage: 70 },
    ],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    skills: [
      { name: "React Native", icon: SiReact, color: "#61DAFB", percentage: 85 },
      { name: "Expo", icon: SiExpo, color: "#FFFFFF", percentage: 80 },
      {
        name: "Nativewind",
        icon: () => (
          <Image src={NativewindIcon} alt="Nativewind" className="h-11 w-11" />
        ),
        color: "#61DAFB",
        percentage: 80,
      },
      {
        name: "NativeBase",
        icon: () => (
          <Image src={NativeBaseIcon} alt="NativeBase" className="h-11 w-11" />
        ),
        color: "#61DAFB",
        percentage: 80,
      },
      //   { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    ],
  },
  {
    title: "Backend",
    icon: List,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#83CD29", percentage: 52 },
      { name: "Express", icon: SiExpress, color: "#FFFFFF", percentage: 56 },
      { name: "MySQL", icon: SiMysql, color: "#4169E1", percentage: 43 },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", percentage: 59 },
      { name: "Firebase", icon: SiFirebase, color: "#DC382D", percentage: 74 },
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
      { name: "GitHub", icon: SiGithub, color: "#ffffff", percentage: 86 },
      { name: "Git", icon: SiGit, color: "#F24E1E", percentage: 89 },
      {
        name: "Figma",
        icon: () => <Image src={FigmaIcon} alt="Figma" className="h-8 w-8" />,
        color: "#F24E1E",
        percentage: 78,
      },
      { name: "Postman", icon: SiPostman, color: "#F24E1E", percentage: 81},
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
        percentage: 84,
      },
      {
        name: "Trello",
        icon: () => <Image src={TrelloIcon} alt="Trello" className="h-8 w-8" />,
        color: "#F24E1E",
        percentage: 88,
      },
      //   { name: "VS Code", icon: () => <Image src={VSCodeIcon} alt="VS Code" className="h-8 w-8" />, color: "#F24E1E" },
    ],
  },
];
