import "./about.css";


import AboutSection from "./aboutsection";
import Certifications from "./certifications";
import Closing from "./closing";
import Education from "./education";
import PhilosophyOfTheForge from "./philosophyOfTheForge";
import SoftSkills from "./softSkills";
import TechnicalForge from "./technicalForge";

export default function AboutPage() {
  return (
    <main className="py-stack-lg relative bg-black">
      {/* <!-- Background Shader/Atmosphere --> */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40"></div>
      {/* <!-- Hero Block --> */}
      <AboutSection />

      {/* <!-- Skills & Tools Grid --> */}
      <TechnicalForge />

      {/* <!-- soft Skills --> */}
      <SoftSkills />

      {/* Education */}
      <Education />

      {/* Certifications */}
      <Certifications />

      {/* <!-- "How I Work" Block --> */}
      {/* <PhilosophyOfTheForge /> */}



      {/* Closing CTA */}
      <Closing />
    </main>
  );
}
