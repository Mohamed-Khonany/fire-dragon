import Banner from "@/components/Sections/hero/banner";
import Projects from "@/components/Sections/projects/projects";
import About from "@/components/Sections/about/about";

export default function Root() {
  return (
    <div className="w-full relative overflow-x-hidden font-body ">
      <div >
        <Banner />
        <About />
        <Projects />
      </div>
    </div>
  );
}
