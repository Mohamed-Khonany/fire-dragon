import { ArrowRight, Radio, Star } from "lucide-react";
import Image from "next/image";
import Pe2piaLogo from "../../public/assets/images/pe2pia/pe2pia.svg";
import Link from "next/link";

export default function ProjectSection() {
  return (
    <section>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-xl">
        <div className="glass-panel rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 group">
          {/* <!-- Info Side --> */}
          <div className="p-8 md:p-12 flex flex-col justify-center relative">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-2 justify-center items-center">
                <Image
                  src={Pe2piaLogo}
                  alt="Pe2pia Logo"
                  className="rounded-full h-14 w-14 object-contain"
                />
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-2 transition-colors duration-500 font-bold">
                  Pe2pia
                </h2>
              </div>
              <span className="inline-flex animate-pulse items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed/10 text-secondary-fixed border border-secondary-fixed/30 font-label-mono text-label-mono">
                <Star className="w-4 h-4" /> Featured
              </span>
            </div>

            <p
              className="font-body-lg text-body-lg mb-6 font-semibold"
              style={{ color: "#FFB800", fontFamily: "monospace" }}
            >
              Lead Frontend Engineer
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 rounded-md border hover:-translate-y-0.75 border-white/20 text-on-surface-variant font-label-mono text-label-mono bg-surface-container-lowest hover:border-orange-500/60 hover:bg-white/10 transition-colors duration-300">
                React Vite
              </span>
              <span className="px-3 py-1 rounded-md border hover:-translate-y-0.75 border-white/20 text-on-surface-variant font-label-mono text-label-mono bg-surface-container-lowest hover:border-orange-500/60 hover:bg-white/10 transition-colors duration-300">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 rounded-md border hover:-translate-y-0.75 border-white/20 text-on-surface-variant font-label-mono text-label-mono bg-surface-container-lowest hover:border-orange-500/60 hover:bg-white/10 transition-colors duration-300">
                Framer Motion
              </span>
              <span className="px-3 py-1 rounded-md border hover:-translate-y-0.75 border-white/20 text-on-surface-variant font-label-mono text-label-mono bg-surface-container-lowest hover:border-orange-500/60 hover:bg-white/10 transition-colors duration-300">
                WebSockets
              </span>
              <span className="px-3 py-1 rounded-md border hover:-translate-y-0.75 border-white/20 text-on-surface-variant font-label-mono text-label-mono bg-surface-container-lowest hover:border-orange-500/60 hover:bg-white/10 transition-colors duration-300">
                i18next
              </span>
              <span className="px-3 py-1 rounded-md border hover:-translate-y-0.75 border-white/20 text-on-surface-variant font-label-mono text-label-mono bg-surface-container-lowest hover:border-orange-500/60 hover:bg-white/10 transition-colors duration-300">
                React Query
              </span>
              <span className="px-3 py-1 rounded-md border hover:-translate-y-0.75 border-white/20 text-on-surface-variant font-label-mono text-label-mono bg-surface-container-lowest hover:border-orange-500/60 hover:bg-white/10 transition-colors duration-300">
                Axios
              </span>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
              A next-generation peer-to-peer platform revolutionizing digital
              exchange. Built with absolute focus on real-time synchronization,
              immersive glassmorphic UI, and bank-grade security protocols.
            </p>
            <ul className="dragon-scale-list font-body-md text-body-md text-on-surface mb-8 space-y-3">
              <li className="flex gap-2">
                <span style={{ color: "#FFCC00" }} aria-hidden="true">
                  ▸
                </span>
                Architected real-time WebSocket infrastructure.
              </li>
              <li className="flex gap-2">
                <span style={{ color: "#FFCC00" }} aria-hidden="true">
                  ▸
                </span>
                Implemented complex state management using Redux Toolkit.
              </li>
              <li className="flex gap-2">
                <span style={{ color: "#FFCC00" }} aria-hidden="true">
                  ▸
                </span>
                Designed bespoke, high-performance animations.
              </li>
              <li className="flex gap-2">
                <span style={{ color: "#FFCC00" }} aria-hidden="true">
                  ▸
                </span>
                Achieved 99 Lighthouse score across all metrics.
              </li>
              <li className="flex gap-2">
                <span style={{ color: "#FFCC00" }} aria-hidden="true">
                  ▸
                </span>
                Integrated seamlessly with Web3 authentication providers.
              </li>
            </ul>
            <div className="flex gap-4">
              <Link
                href="https://pe2pia.com"
                className="bg-gradient-to-r from-primary-container to-inverse-primary text-on-primary-container px-6 py-3 rounded-lg font-label-mono text-label-mono uppercase tracking-widest magnetic-btn fire-glow flex items-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <Radio />
                <span>Live Demo</span>
              </Link>
              <Link
                href="https://github.com/Mohamed-Khonany/Graduation-Project/tree/main/Front-end"
                className="border border-white/20 hover:border-orange-500 text-on-surface hover:text-orange-500 px-6 py-3 rounded-lg font-label-mono text-label-mono uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <ArrowRight />
                <span>View GitHub</span>
              </Link>
            </div>
          </div>
          {/* <!-- Image Side --> */}
          <div className="relative min-h-[400px] lg:min-h-full bg-surface-container-lowest border-t lg:border-t-0 lg:border-l border-white/10 overflow-hidden flex items-center justify-center p-8">
            <div className="w-full h-full relative rounded-lg overflow-hidden border border-white/5 shadow-2xl">
              <Image
                src={Pe2piaLogo}
                className="bg-cover bg-center w-full h-full absolute inset-0 transform group-hover:scale-105 transition-transform duration-700"
                alt="A highly detailed screenshot of a futuristic, dark-mode financial dashboard application named Pe2pia. The interface features a deep charcoal background with glassmorphic panels, glowing fire-orange accents, and intricate data visualization charts. The layout is complex yet minimal, screaming high-end developer mastery in a techno-fantasy aesthetic."
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none"></div>
              <div className="scan-line"></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
