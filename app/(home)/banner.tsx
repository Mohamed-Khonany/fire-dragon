"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/images/logo/logo-banner.png";

import { useEffect, useState } from "react";

export default function Banner() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-40 px-16 bg-black gap-8 sm:px-32 lg:px-16">
      <Image
        src={Logo}
        alt="fire-dragon-logo"
        width={300}
        height={300}
        style={{
          opacity: Math.max(1 - scrollY / 300, 0),
          transform: `
      translateY(${scrollY * 0.25}px)
      scale(${Math.max(1 - scrollY / 1000, 0.7)})
    `,
          transition: "opacity 0.1s linear",
        }}
      />

      <div className="flex flex-col items-center gap-4 text-center">
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

      <div className="flex flex-col gap-6 text-base font-medium sm:flex-row sm:gap-10">
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
