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

import JavaIcon from "../../../assets/images/languageSkills/java.svg";
import NativewindIcon from "../../../assets/images/languageSkills/nativewind.svg";
import NativeBaseIcon from "../../../assets/images/languageSkills/nativeBase.svg";
import FigmaIcon from "../../../assets/images/languageSkills/figma.svg";
import AndroidStudioIcon from "../../../assets/images/languageSkills/androidStudio.svg";
import TrelloIcon from "../../../assets/images/languageSkills/trello.svg";
import VSCodeIcon from "../../../assets/images/languageSkills/vscode.svg";

import Image from "next/image";

/** Types */
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

// caregories
export const CATEGORIES: Category[] = [
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
