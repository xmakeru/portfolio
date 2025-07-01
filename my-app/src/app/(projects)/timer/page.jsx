import ReadMe from "@/components/ReadMe"
import CountDownTimer from "./CountDownTimer"
import CountUpTimer from "./CountUpTimer"
import BackButton from "@/components/BackButton"

function HomePage() {
  return (
    <main className="flex flex-col text-white h-full">  
      <div className="flex-1 flex items-center justify-center">
        <div className="flex-col md:flex-row flex justify-around items-center w-full">
          <CountUpTimer />
          <CountDownTimer />
        </div>
      </div>
    </main>
  )
}

export default HomePage