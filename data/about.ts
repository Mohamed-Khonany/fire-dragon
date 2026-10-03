import { CATEGORIES } from "@/components/Sections/about/technicalForege/categories";
import ProfilePhoto from "../public/assets/images/profilePhoto.png";

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

export const aboutData = {
  name: "Mohamed Khonany",
  description:
    "Passionate Frontend & Mobile Developer specializing in building high-performance web and mobile applications with React, Next.js, and React Native. I graduated in Computer Science from Cairo University in 2024, and since then I've worked as a React Native Developer building production apps with complex UI, smooth animations, and responsive design.\n\nWhat drives me is solving real problems through code — I pay close attention to every detail, pushing each project until it feels fully polished. I enjoy building business systems and mobile apps that have a genuine impact on the people who use them.",
  title: "Frontend Developer | Mobile Developer",
  location: {
    city: "Cairo",
    country: "Egypt",
  },
  contact: {
    github: "https://github.com/Mohamed-Khonany",
    linkedin: "https://www.linkedin.com/in/mohamed-khonany/",
    email: "mkhonany777@gmail.com",
    number: "+20 11 554 04 878",
  },
  profilePhoto: ProfilePhoto,
  yearsOfExperience: "+02",
  cv: "../public/assets/files/Mohamed-Samir-Khonany.pdf",
  skills: {
    technical: CATEGORIES,
    soft: [
      { label: "Attention to detail", icon: Search },
      { label: "Problem-solving", icon: Lightbulb },
      { label: "Team collaboration", icon: Users },
      { label: "Stakeholder Communication", icon: MessageSquare },
      { label: "Time management", icon: Clock },
      { label: "Adaptability", icon: RefreshCw },
      { label: "Ownership", icon: ShieldCheck },
      { label: "Leadership", icon: Crown },
    ],
  },
};
