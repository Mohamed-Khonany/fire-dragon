import AboutSection from "../about/aboutsection";
import TechnicalForge from "../about/technicalForge";

export default function About() {
  return <div className="bg-background w-full h-full justify-center items-center flex flex-col">
    <AboutSection />
    <TechnicalForge />
  </div>;
}
