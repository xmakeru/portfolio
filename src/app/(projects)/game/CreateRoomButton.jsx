'use client'
import { useRouter } from "next/navigation"
import { useGameStore } from "@/store/useGameStore";
import { nanoid } from "nanoid";

function CreateRoomButton() {
  const router = useRouter()
  const createRoom = useGameStore(state => state.createRoom);

  function startGame() {
    const roomId = nanoid()
    createRoom(roomId)
    router.push(`game/${roomId}`)
  }

  return(
    <div className="flex justify-center items-center">
      <button
        onClick={startGame}
        className="group relative px-12 py-6 bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-sm border border-white/30 rounded-3xl text-2xl md:text-3xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:from-white/35 hover:to-white/25 overflow-hidden"
        aria-label="Создать новую игровую комнату и начать игру"
      >
        {/* Эффект свечения */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        
        {/* Иконка игры */}
        <div className="relative z-10 flex items-center gap-4">
          <svg className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            Создать комнату
          </span>
        </div>
        
        {/* Анимированная граница */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/50 via-orange-400/50 to-yellow-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      </button>
    </div>
  )
}

export default CreateRoomButton