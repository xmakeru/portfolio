import CountDownTimer from "./CountDownTimer"
import CountUpTimer from "./CountUpTimer"
import './timer.css'

function HomePage() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          <CountUpTimer />
          <CountDownTimer />
        </div>
      </div>
    </main>
  )
}

export default HomePage