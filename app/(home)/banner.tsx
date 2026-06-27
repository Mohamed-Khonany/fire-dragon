import Link from "next/link";
import AnimatedBanner from "@/components/animated-path/animated-banner";

export default function Banner() {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black
    px-6
    sm:px-10
    md:px-16
    lg:px-20

    pt-60

    gap-8
  "
    >
      <AnimatedBanner />

      <div className="flex flex-col items-center gap-4 text-center z-10">
        <span className=" text-5xl font-extrabold text-on-surface tracking-widest ">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-container to-secondary">
            Fire{" "}
          </span>{" "}
          Dragon
        </span>
        <p className="max-w-md sm:text-lg leading-8 text-zinc-400">
          Mohamed Khonany Portfolio website
        </p>
      </div>

      <div className="flex flex-col gap-6 text-base font-medium sm:flex-row sm:gap-10 z-10">
        <Link
          className="magnetic-btn  py-4 w-60 h-16 text-center justify-center items-center bg-linear-to-r from-primary-container to-secondary text-on-primary font-headline-md text-headline-md md:text-[20px] rounded hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,90,0,0.4)]"
          href="#projects"
        >
          Explore My Work
        </Link>
        <Link
          className="magnetic-btn  py-4 w-60 h-16 text-center justify-center items-center bg-surface-container-high border border-white/10 text-on-surface font-headline-md text-headline-md md:text-[20px] rounded hover:scale-105 hover:bg-surface-container-highest transition-colors duration-300"
          href="#about"
        >
          Discover About Me
        </Link>
      </div>
    </div>
  );
}
