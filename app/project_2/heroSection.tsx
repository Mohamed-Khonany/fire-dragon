"use client";
import Image from "next/image";

import Cloud from "./clouds-book/Images/cloud.webp";
import Branch from "./clouds-book/Images/branch-1.webp";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSection() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.set(".cloud", {
        y: "random(-100,300)",
        scale: "random(0.1,0.5)",
      });

      const windowWidth = window.innerWidth;

      gsap.fromTo(
        ".cloud",
        {
          x: `random(0, ${windowWidth})`,
        },
        {
          x: `random(0, ${windowWidth})`,
          duration: 30,
          ease: "none",
          stagger: {
            yoyo: true,
            repeat: -1,
          },
        },
      );

      // intro
      const introTL = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
          duration: 1.5,
        },
      });

      introTL
        .from("#heroElements", {
          clipPath: "inset(30% 20% 30% 20%)",
          delay: 1,
        })
        .from(
          "#heroSection :is(h1,h2,p)",
          {
            clipPath: "inset(100% 0% 0% 0%)",
            stagger: 0.1,
            y: 50,
          },
          "<20%",
        );

        // hero animations
        const heroTL = gsap.timeline({
            scrollTrigger: {
                trigger: "#heroSection",
                start: "top top",
                scrub: 1,
            },
        }).to(
          "#heroSection :is(h1,h2,p)",
          {
            opacity: 0,
            y: 50,
          },
          "<20%",
        ).to(".large-cloud-1", {
            scale:2,
        },0).to(".large-cloud-2", {
            scale:2,
        },0).to(".branch-1", {
            y:200,
        },0).to(".branch-2", {
            y:-200,
        },0).to(".branch-3", {
            y:-200,
        },0)
    },
    { scope: heroSectionRef },
  );
  return (
    <section
      ref={heroSectionRef}
      id="heroSection"
      className=" relative overflow-hidden grid place-content-center h-screen  z-1 text-black font-extrabold"
    >
      <div
        id="heroElements"
        className="bg-linear-to-b from-blue-500 to-white -z-1 h-screen size-full absolute inset-0"
      >
        <Image
          src={Cloud}
          alt=""
          className="large-cloud-1 absolute -bottom-50 -left-100 w-250"
        />
        <Image
          src={Cloud}
          alt=""
          className="large-cloud-2 absolute -bottom-100 -right-50 w-400"
        />
        <Image src={Cloud} alt="" className="cloud absolute " />
        <Image src={Cloud} alt="" className="cloud absolute" />
        <Image src={Cloud} alt="" className="cloud absolute" />
        <Image src={Cloud} alt="" className="cloud absolute" />
        <Image
          src={Branch}
          alt=""
          className="branch-1 absolute  right-0 top-0 w-200"
        />
        <Image
          src={Branch}
          alt=""
          className="branch-2 absolute scale-x-[-1] left-0 bottom-20 w-200 -z-1"
        />
        <Image
          src={Branch}
          alt=""
          className="branch-3 absolute right-0 bottom-0 w-100 -z-1"
        />
      </div>
      <div className="text-center max-w-xl flex flex-col items-center">
        <h2 className="will-change-transform text-3xl">
          The <span className="text-white">Clouds</span> Forgot Her
        </h2>
        <h1 className="will-change-transform text-7xl lg:text-[200px] text-white ">
          {" "}
          Name
        </h1>
        <p className="will-change-transform font-bold">
          The clouds gathered, heavy with unshed tears, yet the sky remained
          dry, stoic in its silence. The earth below, parched and yearning,
          looked up in anticipation
        </p>
      </div>
    </section>
  );
}
