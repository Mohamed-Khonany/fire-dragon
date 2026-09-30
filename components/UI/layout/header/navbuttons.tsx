import { Globe, Menu } from "lucide-react";

export const NavButtons = () => {
  return (
    <div className="flex items-center gap-6">
      <button className="block font-label-mono text-label-mono uppercase hover:text-white text-primary-container duration-300 transition-all ">
        <span className="flex flex-row gap-1 z-10 font-semibold text-[20px] justify-center text-center items-center text-lg shadow-background">
          <Globe size={22} /> EN
        </span>
      </button>
      {/* <button className="flex flex-row gap-2 font-label-mono text-label-mono uppercase hover:text-primary border tracking-widest hover:border-on-surface px-6 py-2 rounded border-primary-container text-primary-container duration-300 transition-all">
        <span className="hidden lg:block">Download</span>CV
      </button> */}
      <button className="lg:hidden text-primary-container">
        <Menu size={30} />
      </button>
    </div>
  );
};
