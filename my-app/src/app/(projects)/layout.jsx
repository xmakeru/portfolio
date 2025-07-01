'use client'
import BackButton from "@/components/BackButton";
import ReadMe from "@/components/ReadMe";
import { usePathname } from "next/navigation";

export default function TimerLayout({ children }) {
  const pathname = usePathname()
  const title = pathname.split("/")
  return (
    <div className="">
      <div className="flex justify-between items-center px-8 py-4 bg-[#BA5624]">
        <BackButton />
        <h1 className="text-4xl text-black">{title}</h1>
        <ReadMe />
      </div>
      {children}
    </div>
  );
}
