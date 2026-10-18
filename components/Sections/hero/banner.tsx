
import AnimatedBanner from "@/components/UI/animated-path/animated-banner";


import { heroData } from "@/data/hero-data";

export default function Banner() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background
           "
    >
      <AnimatedBanner isHome={true} heroData={heroData} />

      {/* <p className="md:absolute md:bottom-0 md:left-3 max-w-md sm:text-xl md:text-sm leading-8 text-zinc-400 cursor-default">
          {heroData.description}
        </p> */}

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
