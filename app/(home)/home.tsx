import About from "./about";
import Banner from "./banner";
import Projects from "./projects";
import Work from "./work";


export default function Home() {
  return (
    <>
      <Banner />
      <About />
      <Projects />
      <Work />
      <Banner />
    </>
  );
}
