import { NavLinks } from "./navlinks";
import { NavButtons } from "./navbuttons";
import { NavLogo } from "./navlogo";

export const Header = () => {
  return (
    <header className="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 shadow-[0_0_30px_rgba(255,90,0,0.1)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop pt-2  max-w-container-max mx-auto">
        <NavLogo />
        <NavLinks />
        <NavButtons />
      </div>
    </header>
  );
};
