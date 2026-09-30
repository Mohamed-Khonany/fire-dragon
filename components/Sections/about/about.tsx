import AboutSection from "./aboutHero/aboutsection";
import TechnicalForge from "./technicalForege/technicalForge";

export default function About() {
  return (
    <section className="flex flex-col flex-1 items-center justify-center bg-background font-body ">
      <AboutSection />
      <TechnicalForge />
    </section>
  );
}
