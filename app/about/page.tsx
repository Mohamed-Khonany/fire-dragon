import { Metadata } from "next";
import AboutPage from "./aboutpage";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return <AboutPage />;
}
