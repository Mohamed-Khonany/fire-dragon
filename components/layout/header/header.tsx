import { NavLinks } from "./navlinks";
import Logo from "../../../assets/images/logo/logo.png"
import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 shadow-[0_0_30px_rgba(255,90,0,0.1)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop pt-2  max-w-container-max mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="fire-dragon-logo"
            width={70}
            height={50}
          />
        </div>
        <NavLinks />
        <div className="flex items-center gap-4">
          <button className="hidden md:block font-label-mono text-label-mono uppercase text-on-surface border border-on-surface px-3 py-2 rounded hover:border-primary-container hover:text-primary-container duration-300 transition-all ">
            <span>Ar</span>
          </button>
          <button className="hidden md:block font-label-mono text-label-mono uppercase text-on-surface border border-on-surface px-6 py-2 rounded hover:border-primary-container hover:text-primary-container duration-300 transition-all">
            Download CV
          </button>
          <button className="lg:hidden text-primary">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
