"use client";
import Image from "next/image";

import art1 from "./clouds-book/Images/art-1.webp";
import art2 from "./clouds-book/Images/art-2.webp";
import art3 from "./clouds-book/Images/art-3.webp";
import art4 from "./clouds-book/Images/art-4.webp";
import art5 from "./clouds-book/Images/art-5.webp";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HorizontalSection() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {

      const slides = gsap.utils.toArray(".slide");
      const horizontalScroll = gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          start: "top top",
          end: `+=${slides.length * 1000}px`,
          scrub: true,
          anticipatePin: 1,
        },
      });

      slides.forEach((slide: any, index) => {
        const elements = slide.querySelectorAll("h2, h3, p, img");

        if (index !== 0) {
          gsap.from(elements, {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: slide,
              start: "top center",
              containerAnimation: horizontalScroll,
              toggleActions: "play reverse play reverse",
            },
          });
        }
      });
    },
    { scope: horizontalSectionRef },
  );

  return (
    <section className="relative w-full overflow-hidden">
      <div
        id="horizontalSection"
        ref={horizontalSectionRef}
        className="relative w-full min-w-fit flex nowrap bg-white"
      >
        <div className="relative slide w-screen h-screen flex justify-center flex-col p-20">
          <h2 className="text-4xl text-red-500">A Book by</h2>
          <h2 className="text-7xl xl:text-[200px]">alice white</h2>
        </div>
        <div className="relative slide w-screen h-screen grid lg:grid-cols-2 items-center p-20">
          <div>
            <h3 className="text-4xl text-red-500">Chapter 1</h3>
            <h2 className="text-5xl xl:text-8xl mb-20 mt-5">
              The Whispering Sky
            </h2>
            <p className="text-zinc-500 font-light">
              {" "}
              In the quiet hours before dawn, the clouds drifted lazily across
              the horizon, their forms ever-changing, yet familiar. Among them
              was a particular cloud, soft and luminous, who felt a peculiar
              emptiness—a name once held close now slipping through the vapors
              of her being. She searched the vast expanse, hoping the wind would
              carry back the syllables that defined her.{" "}
            </p>
          </div>
          <Image
            src={art1}
            alt=""
            className="object-contain mx-auto rounded-xl shadow-xl shadow-red-400 h-150 w-auto"
          />
        </div>
        <div className="relative slide w-screen h-screen grid lg:grid-cols-2 items-center p-20">
          <div>
            <h3 className="text-4xl text-red-500">Chapter 2</h3>
            <h2 className="text-5xl xl:text-8xl mb-20 mt-5">
              Echoes in the Breeze
            </h2>
            <p className="text-zinc-500 font-light">
              {" "}
              As days turned to weeks, the nameless cloud observed the world
              below—children laughing, lovers embracing, elders reminiscing.
              Each scene stirred something within her, a distant echo of
              belonging. She attempted to mimic the shapes of memories she
              couldn’t quite grasp, hoping that by becoming them, she’d remember
              who she was.{" "}
            </p>
          </div>
          <Image
            src={art2}
            alt=""
            className="object-contain mx-auto rounded-xl shadow-xl shadow-red-400 h-150 w-auto"
          />
        </div>
        <div className="relative slide w-screen h-screen grid lg:grid-cols-2 items-center p-20">
          <div>
            <h3 className="text-4xl text-red-500">Chapter 3</h3>
            <h2 className="text-5xl xl:text-8xl mb-20 mt-5">
              The Rain Remembers
            </h2>
            <p className="text-zinc-500 font-light">
              {" "}
              One evening, heavy with unspoken longing, she released a gentle
              rain upon a parched meadow. The droplets danced on leaves and
              kissed the earth, awakening dormant seeds. In that act of giving,
              fragments of her identity shimmered briefly—was she a nurturer, a
              guardian, a muse? The rain whispered possibilities, but certainty
              remained elusive.{" "}
            </p>
          </div>
          <Image
            src={art3}
            alt=""
            className="object-contain mx-auto rounded-xl shadow-xl shadow-red-400 h-150 w-auto"
          />
        </div>
        <div className="relative slide w-screen h-screen grid lg:grid-cols-2 items-center p-20">
          <div>
            <h3 className="text-4xl text-red-500">Chapter 4</h3>
            <h2 className="text-5xl xl:text-8xl mb-20 mt-5">
              {" "}
              Reflections in Puddles
            </h2>
            <p className="text-zinc-500 font-light">
              The world responded to her presence. Artists painted her moods,
              poets penned verses about her grace, and children pointed,
              assigning names from their imaginations. She saw herself mirrored
              in puddles and lakes, distorted yet revealing. Through others’
              perceptions, she began to piece together a mosaic of who she might
              be, each reflection a clue to her forgotten name.{" "}
            </p>
          </div>
          <Image
            src={art4}
            alt=""
            className="object-contain mx-auto rounded-xl shadow-xl shadow-red-400 h-150 w-auto"
          />
        </div>
        <div className="relative slide w-screen h-screen grid lg:grid-cols-2 items-center p-20">
          <div>
            <h3 className="text-4xl text-red-500">Chapter 5</h3>
            <h2 className="text-5xl xl:text-8xl mb-20 mt-5">
              The Return of Her Name
            </h2>
            <p className="text-zinc-500 font-light">
              {" "}
              As seasons shifted, so did she. Embracing the myriad identities
              projected onto her, the cloud realized that her essence wasn’t
              confined to a single name. She was ever-evolving, shaped by
              interactions and experiences. In this acceptance, she felt whole.
              The name she once lost returned, not as a fixed label, but as a
              fluid understanding of self—a harmony between being and
              becoming.{" "}
            </p>
          </div>
          <Image
            src={art5}
            alt=""
            className="object-contain mx-auto rounded-xl shadow-xl shadow-red-400 h-150 w-auto"
          />
        </div>
      </div>
    </section>
  );
}
