import Link from "next/link";
import AnimatedBanner from "@/components/UI/animated-path/animated-banner";
import { FireSpan, FireDev } from "@/components/UI/fireSpan/fire";
import GradientText from "@/components/UI/fireSpan/gradientText";
import { heroData } from "@/data/hero-data";

export default function Banner() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black
          px-6 sm:px-10 md:px-16 lg:px-20 pt-52"
    >
      <AnimatedBanner isHome={true} />
      <div className="flex flex-col items-center pb-20 justify-center gap-4 text-center z-10">
        <span className="text-6xl font-extrabold text-on-surface tracking-widest cursor-default">
          <GradientText inline={true}>{heroData.firstName}</GradientText>{" "}
          {heroData.lastName}
        </span>
        <p className="max-w-md sm:text-xl leading-8 text-zinc-400 cursor-default">
          {heroData.description}
        </p>
      </div>

      {/* 
      <div className="flex flex-col gap-6 text-base font-medium sm:flex-row sm:gap-10 z-10">
        <Link
          href="/projects"
        >
          <FireDev className="py-4 w-60 h-16">Explore My Work</FireDev>
        </Link>
        <Link
          className="magnetic-btn  py-4 w-60 h-16 text-center justify-center items-center bg-surface-container-high border border-white/10 text-on-surface font-headline-md text-headline-md md:text-[20px] rounded hover:scale-105 hover:bg-surface-container-highest transition-colors duration-300"
          href="/about"
        >
          Discover About Me
        </Link>
      </div> */}
    </section>
  );
}
