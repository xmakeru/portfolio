'use client'
import { useEffect, useState } from "react"

function GameInRoom({ roomId }) {
  const [fullUrl, setFullUrl] = useState('')
  const [flashingText, setFlashingText] = useState('')

  useEffect(() => {
    setFullUrl(window.location.href)
  }, [])

  const copyText = (event) => {
    const textToCopy = event.target.textContent
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setFlashingText("Ссылка скопирована!")
        setTimeout(() => setFlashingText(''), 2000) // через 2 секунды убираем сообщение
      })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 relative overflow-hidden">
      {/* Анимированные фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 h-[calc(100vh-72px)] flex justify-center items-center flex-col text-white px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent drop-shadow-lg">
            Игровая комната
          </h1>
          <p className="text-lg text-white/90">
            Поделитесь ссылкой с друзьями, чтобы начать игру
          </p>
        </div>

        {/* Уведомление о копировании */}
        {flashingText && (
          <div className="absolute top-32 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-2xl text-black text-center shadow-xl animate-bounce z-20">
            <p className="font-semibold text-lg">{flashingText}</p>
          </div>
        )}

        {/* Ссылка для копирования */}
        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl border border-white/30 shadow-2xl max-w-2xl w-full text-center">
          <div 
            className="cursor-pointer relative select-text group" 
            onClick={copyText}
          >
            <p className="text-lg md:text-xl font-mono text-white break-all group-hover:text-yellow-100 transition-colors duration-300">
              {fullUrl}
            </p>
            
            {/* Иконка копирования */}
            <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            </div>
          </div>
          
          <p className="text-white/80 mt-4 text-sm md:text-base">
            Кликните для копирования ссылки, по ней пригласите друзей в игру
          </p>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <p className="text-white/90 text-sm">
              ID комнаты: <span className="font-mono font-bold text-yellow-200">{roomId}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GameInRoom
