'use client';

import { useCallback, useRef } from "react";
import Banner from "@/components/Sections/hero/banner";
import Projects from "@/components/Sections/projects/projects";
import About from "@/components/Sections/about/about";
import SiteLoader from "@/components/UI/loader/site-loader";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Root() {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const handleLoaderComplete = useCallback(() => {
    // Create or unpause ScrollSmoother once the loader and animated transform finish
    if (!smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
        normalizeScroll: true,
      });
    } else {
      smootherRef.current.paused(false);
    }
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <SiteLoader onComplete={handleLoaderComplete} />
      <div id="smooth-wrapper" className="w-full relative overflow-x-hidden font-body">
        <div id="smooth-content">
          <Banner />
          <About />
          <Projects />
        </div>
      </div>
    </>
  );
}