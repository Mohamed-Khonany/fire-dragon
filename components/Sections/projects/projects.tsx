"use client";
// import ProjectsSection from "../projects/projectSection";
import GradientText from "@/components/UI/fireSpan/gradientText";

import { useRef } from "react";
import StrokeText from "@/components/UI/stroke-Text/stokeText";

export default function Projects() {
  // this is the element ScrollTrigger will pin
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sectionRef}
      className="bg-background relative justify-center items-center overflow-x-hidden "
    >
      <StrokeText
        pinRef={sectionRef}
        text="Projects"
        strokeWidth={1.4}
        drawDuration={1.6}
        fillDelay={0.8}
        stagger={0.05}
        ease="power2.out"
        fillMode="wipe"
        fontSize={200}
        fontWeight={800}
        letterSpacing={-4}
        scrollLength="150%"
        scrub={1}
      />
      {/* <ProjectsSection /> */}
    </div>
  );
}
