import Banner from "./(home)/banner";
import About from "./(home)/about";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black dark:bg-black font-body ">
      <Banner />
      <About />
      <Banner />
      <Banner />
      <Banner />
    </div>
  );
}
