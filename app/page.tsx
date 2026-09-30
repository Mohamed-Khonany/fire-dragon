import Home from "./(home)/home";
import Banner from "@/components/Sections/hero/banner";
import Work from "./work/page";
import Projects from "@/components/Sections/projects/projects";
import About from "./about/page";

export default function Root() {
  return (
    <div className="w-full relative overflow-x-hidden font-body ">
      <Banner />
      <About />
      <Projects />
      <Work />
      <Banner />
    </div>
  );
}
