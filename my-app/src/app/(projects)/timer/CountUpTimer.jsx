'use client'
import { useState, useEffect, useRef } from "react"

function CountUpTimer() {
  const [totalseconds, setTotalSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const refTimer = useRef()

  const hours = Math.floor(totalseconds / 3600)
  const minutes = Math.floor((totalseconds % 3600) / 60)
  const seconds = totalseconds % 60

  const startTimer = () => {
    if (refTimer.current) return
    setIsRunning(true)
    refTimer.current = setInterval(() => {
      setTotalSeconds(prev => prev + 1)
    }, 1000)
  } 

  const pauseTimer = () => {
    clearInterval(refTimer.current)
    refTimer.current = null
    setIsRunning(false)
  }

  const resetTimer = () => {
    clearInterval(refTimer.current)
    refTimer.current = null
    setTotalSeconds(0)
    setIsRunning(false)
  }

  useEffect(() => {
    return () => clearInterval(refTimer.current)
  }, [])

  return(
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Секундомер</h2>
          <p className="text-gray-300">Отслеживайте время</p>
        </div>

        {/* Таймер */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-6 mb-6">
            <div className="text-6xl font-mono font-bold text-white tracking-wider">
              {hours < 10 ? `0${hours}` : hours}:
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <div className="text-sm text-gray-400 mt-2">часы : минуты : секунды</div>
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="flex gap-3 justify-center">
          <button 
            onClick={startTimer}
            disabled={isRunning}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Запустить секундомер"
          >
            {isRunning ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Работает
              </div>
            ) : (
              'Старт'
            )}
          </button>
          
          <button 
            onClick={pauseTimer}
            disabled={!isRunning}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-4 rounded-xl font-medium hover:from-yellow-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Приостановить секундомер"
          >
            Пауза
          </button>
          
          <button 
            onClick={resetTimer}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
            aria-label="Сбросить секундомер"
          >
            Сброс
          </button>
        </div>

        {/* Статистика */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-3 text-center">Статистика</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-400">{hours}</p>
              <p className="text-sm text-gray-300">Часов</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">{minutes}</p>
              <p className="text-sm text-gray-300">Минут</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountUpTimer