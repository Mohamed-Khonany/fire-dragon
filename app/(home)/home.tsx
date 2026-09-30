import About from "../../components/Sections/about/about";
import Banner from "../../components/Sections/hero/banner";
import Projects from "../../components/Sections/projects/projects";
import Work from "./work";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black dark:bg-black font-body h-screen">
      <Banner />
      <About />
      <Projects />
      <Work />
      <Banner />
    </div>
  );
}
