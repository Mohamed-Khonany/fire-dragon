"use client";
import { useEffect, useState } from "react";

import { NavLinks } from "./navlinks";
import { NavButtons } from "./navbuttons";
import { NavLogo } from "./navlogo";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
    fixed top-0 left-0 w-full z-50
    transition-all duration-500
    ${
      scrolled
        ? `
          bg-surface/80
          backdrop-blur-xl
          border-b border-white/10
          shadow-[0_0_30px_rgba(255,90,0,0.1)]
        `
        : `
          bg-transparent
          border-transparent
        `
    }
  `}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop pt-2  max-w-container-max mx-auto">
        {/* {scrolled && <NavLogo scrolled={scrolled}/>} */}
        <div
          className={`
    transition-all duration-500
    ${
      scrolled
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 -translate-x-6 scale-75"
    }
  `}
        >
          <NavLogo />
        </div>
        <div
          className={`
    transition-all duration-500
    ${scrolled ? "translate-x-0" : "-translate-x-36"}
  `}
        >
          <NavLinks />
        </div>
        <NavButtons />
      </div>
    </header>
  );
};
