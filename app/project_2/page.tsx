"use client";
import HeroSection from "./heroSection";
import FramesSection from "./framesSection";
import HorizontalSection from "./horizontalSection";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Banner from "@/components/Sections/hero/banner";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Project2() {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({ smooth: 2 });
  });

  return (
    <div className="w-full relative overflow-x-hidden">
      <div id="smooth-content" className="text-black">
        <Banner />

        {/* <HeroSection /> */}

        <HorizontalSection />

        <FramesSection />

        <section className="relative h-screen"></section>
      </div>
    </div>
  );
}
