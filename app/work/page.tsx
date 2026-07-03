import { Metadata } from "next";
import WorkExperienceSection from "./worksection";


export const metadata: Metadata = {
    title: "Work",
}

export default function Work() {
    return (
        <div className="bg-background w-full h-full justify-center items-center flex flex-col pt-16">
            <WorkExperienceSection />
        </div>
    )
}