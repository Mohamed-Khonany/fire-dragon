import { Metadata } from "next";
import WorkExperienceSection from "./worksection";
import "../about/about.css";
import "./work.css";
import Closing from "../about/closing";
export const metadata: Metadata = {
  title: "Work",
};

export default function Work() {
  return (
    <main className="bg-black text-on-background font-body-md text-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container pt-40">
      <section className="relative overflow-hidden mb-stack-xl flex flex-col items-center text-center text-on-surface">
        <div className="absolute inset-0 circuit-bg -z-10 opacity-60"></div>
        <h1 className="font-display-xl font-extrabold text-display-xl-mobile md:text-display-xl tracking-tighter mb-stack-sm drop-shadow-lg">
          <span className="gradient-text">FORGED </span> IN EXPERIENCE
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-md">
          A record of what I've built, architected, and optimized. From
          enterprise solutions to award-winning academic projects.
        </p>
      </section>
      <WorkExperienceSection />
      <Closing />
    </main>
  );
}
