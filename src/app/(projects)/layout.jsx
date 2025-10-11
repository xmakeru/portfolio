'use client'
import BackButton from "@/components/BackButton";
import ReadMe from "@/components/ReadMe";
import { usePathname } from "next/navigation";

export default function TimerLayout({ children }) {
  const pathname = usePathname()
  const title = pathname.split("/")
  return (
    <div className="">
      <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
        <BackButton />
        <h1 className="text-4xl text-white">{title}</h1>
        <ReadMe />
      </div>
      {children}
    </div>
  );
}
