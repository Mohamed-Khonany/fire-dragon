"use client";

import { useCallback, useRef, useState } from "react";
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
  const [contentVisible, setContentVisible] = useState(false);

  // Initialize ScrollSmoother on mount so that child ScrollTriggers bind to the smoother correctly
  useGSAP(() => {
    smootherRef.current = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0,
    });
    // Pause scroll while loader is running
    smootherRef.current.paused(true);
  });

  const handleStartReveal = useCallback(() => {
    // Reveal content right as the shutter separation begins at 100%
    setContentVisible(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    // Unpause smoother and refresh triggers once loader finishes
    if (smootherRef.current) {
      smootherRef.current.paused(false);
    }
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <SiteLoader
        onStartReveal={handleStartReveal}
        onComplete={handleLoaderComplete}
      />
      <div
        id="smooth-wrapper"
        className={`w-full relative overflow-x-hidden font-body transition-opacity duration-300 ${
          contentVisible
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div id="smooth-content">
          <Banner />
          <About />
          <Projects />
        </div>
      </div>
    </>
  );
}
