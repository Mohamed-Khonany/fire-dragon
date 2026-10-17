"use client";
import Image from "next/image";

import digital1 from "./clouds-book/Images/digital-1.webp";
import digital2 from "./clouds-book/Images/digital-2.webp";
import digital3 from "./clouds-book/Images/digital-3.webp";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FramesSection() {
  const framesSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frames = gsap.utils.toArray(".frame");
      gsap.set(frames, { zIndex: (i) => -i + 1 });

      const framesTL = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: framesSectionRef.current,
          start: "top top",
          end: `+=${frames.length * 1000}px`,
          pin: true,
          scrub: 1,
        },
      });

      frames.forEach((frame: any, index) => {
        if (index !== frames.length - 1) {
          framesTL.to(frame, {
            clipPath: "inset(0% 0% 100% 0%)",
          });
        }
      });
    },
    { scope: framesSectionRef },
  );

  return (
    <section className="relative">
      <div
        id="framesSection"
        ref={framesSectionRef}
        className="relative h-screen text-white text-center uppercase text-8xl"
      >
        <div className="frame absolute inset-0 size-full flex justify-center items-center">
          <h2 className="absolute">Ephemerality</h2>
          <Image src={digital1} alt="" className="size-full object-cover" />
        </div>
        <div className="frame absolute inset-0 size-full flex justify-center items-center">
          <h2 className="absolute">Mono no aware</h2>
          <Image src={digital2} alt="" className="size-full object-cover" />
        </div>
        <div className="frame absolute inset-0 size-full flex justify-center items-center">
          <h2 className="absolute">Mnemosyne</h2>
          <Image src={digital3} alt="" className="size-full object-cover" />
        </div>
      </div>
    </section>
  );
}
