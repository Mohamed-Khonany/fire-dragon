import { Globe, Menu } from "lucide-react";


export const NavButtons = () => {
  return (
    <div className="flex items-center gap-6">
      <button className="hidden md:block font-label-mono text-label-mono uppercase hover:text-primary text-primary-container duration-300 transition-all ">
        <span className="flex flex-row gap-1 justify-center items-center text-lg"><Globe size={22}/> EN</span>
      </button>
      <button className="hidden md:block font-label-mono text-label-mono uppercase hover:text-on-surface border tracking-widest hover:border-on-surface px-6 py-2 rounded border-primary-container text-primary-container duration-300 transition-all">
        Download CV
      </button>
      <button className="lg:hidden text-primary-container">
        <Menu size={30} />
      </button>
    </div>
  );
};
