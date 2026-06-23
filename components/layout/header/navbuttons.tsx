export const NavButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="hidden md:block font-label-mono text-label-mono uppercase hover:text-on-surface border hover:border-on-surface px-3 py-2 rounded border-primary-container text-primary-container duration-300 transition-all ">
        <span>Ar</span>
      </button>
      <button className="hidden md:block font-label-mono text-label-mono uppercase hover:text-on-surface border hover:border-on-surface px-6 py-2 rounded border-primary-container text-primary-container duration-300 transition-all">
        Download CV
      </button>
      <button className="lg:hidden text-primary">
        <span className="material-symbols-outlined text-3xl">menu</span>
      </button>
    </div>
  );
};
