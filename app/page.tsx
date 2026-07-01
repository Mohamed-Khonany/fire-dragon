import Home from "./(home)/home";

export default function Root() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black dark:bg-black font-body ">
      <Home />
    </div>
  );
}
