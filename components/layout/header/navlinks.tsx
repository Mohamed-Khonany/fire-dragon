"use client";
import { Line, Path } from "@/components/animated-path/animated-path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../animated-path/animated-path.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/Projects", label: "Projects" },
  { href: "/Work", label: "Work" },
  { href: "/Contact", label: "Contact" },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden xl:flex items-center justify-center gap-5 py-7">
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (pathname.startsWith(link.href) && link.href !== "/");
        return (
          <div
            className="fire-wrapper h-5 w-30 relative flex items-center justify-center"
            key={link.href}
          >
            {isActive ? (
              <svg
                className="fire-ai-bg absolute inset-0 m-auto pointer-events-none"
                style={{ fill: "none" }}
                viewBox="0 0 200 40"
                width="180"
                height="40"
              >
                <Path d="M15,30 H50 C70,30 70,5 100,5 H120" strokeWidth={3} />
                <circle className="fire-dot" cx="15" cy="30" r="2" />
                <circle className="fire-dot" cx="120" cy="5" r="2" />
              </svg>
            ) : (
              <svg
                className="fire-ai-bg absolute inset-0 m-auto pointer-events-none"
                style={{ fill: "none" }}
                viewBox="0 0 200 40"
                width="180"
                height="40"
              >
                <path d="M15,30 H50 C70,30 70,5 100,5 H120" strokeWidth={1} className="stroke-white/10"/>
                <circle className="stroke-white/10" cx="15" cy="30" r="2" />
                <circle className="stroke-white/10" cx="120" cy="5" r="2" />
              </svg>
            )}
            <Link
              className={`${isActive ? "text-primary-container hover:drop-shadow-[0_0_12px_#ffb000]" : "text-on-surface hover:text-primary hover:drop-shadow-[0_0_12px_#ffb000]"} font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};
