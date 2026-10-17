'use client';

import Banner from "@/components/Sections/hero/banner";
import Projects from "@/components/Sections/projects/projects";
import About from "@/components/Sections/about/about";


import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Root() {
  
  useGSAP(() => {
    const smoother = ScrollSmoother.create({ smooth: 4, effects: true, normalizeScroll: true });
  });

  return (
    <div id="smooth-wrapper" className="w-full relative overflow-x-hidden font-body ">
      <div id="smooth-content">
        <Banner />
        <About />
        <Projects />
      </div>
    </div>
  );
}