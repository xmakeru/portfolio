'use client'
import { useState } from "react"
import CreateRoomButton from "./CreateRoomButton"
import { useGameStore } from "@/store/useGameStore"

function GamePage() {
  const addPlayer = useGameStore(state => state.addPlayer)
  const getCurrentPlayer = useGameStore(state => state.getCurrentPlayer)
  const [playerName, setPlayerName] = useState('')
  const [flashingText, setFlashingText] = useState('')

  const handleChangeName = (e) => {
    setPlayerName(e.target.value)
  }

  const handleAddPlayer = () => {
    if (playerName.trim() === '') return
    
    const currentPlayer = getCurrentPlayer()
    const playerId = addPlayer(playerName)
    
    setPlayerName('')
    
    setFlashingText(`Привет, ${playerName}!`)
    
    setTimeout(() => setFlashingText(''), 2000)
  }

  const currentPlayer = getCurrentPlayer()

  return(
    <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 relative overflow-hidden">
      {/* Анимированные фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 h-[calc(100vh-72px)] flex flex-col justify-center items-center gap-12 px-4">
        {/* Заголовок */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent drop-shadow-lg">
            Игровая зона
          </h1>
          <p className="text-lg text-white/90 max-w-md mx-auto">
            Создайте комнату и пригласите друзей для совместной игры
          </p>
        </div>

        {/* Уведомление */}
        {flashingText && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-2xl text-black text-center shadow-xl animate-bounce z-20">
            <p className="font-semibold text-lg">{flashingText}</p>
          </div>
        )}
        
        {/* Информация о текущем игроке */}
        {currentPlayer && (
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-white">Текущий игрок:</h3>
            <p className="text-2xl font-bold text-white mb-2">{currentPlayer.name}</p>
            <p className="text-lg text-white/80">Счет: {currentPlayer.score}</p>
          </div>
        )}
        
        {/* Форма ввода имени */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <input 
            type="text" 
            placeholder="Введите имя игрока" 
            className="flex-1 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
            value={playerName}
            onChange={handleChangeName}
            onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
          />
          <button 
            onClick={handleAddPlayer} 
            className="px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {currentPlayer ? 'Изменить имя' : 'Подтвердить'}
          </button>
        </div>

        {/* Кнопка создания комнаты */}
        <CreateRoomButton />
      </div>
    </main>
  )
}

export default GamePage