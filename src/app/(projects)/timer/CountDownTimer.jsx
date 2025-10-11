'use client'
import { useState, useEffect, useRef, useMemo } from "react"
import TimeInput from './TimeInput'

function CountDownTimer() {
  const [totalseconds, setTotalSeconds] = useState(60)
  const [initialSeconds, setInitialSeconds] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const refTimer = useRef()
  const [inputMins, setInputMins] = useState("")
  const [inputHours, setInputHours] = useState("")  

  const { hours, minutes, seconds } = useMemo(() => {
    const h = Math.floor(totalseconds / 3600)
    const m = Math.floor((totalseconds % 3600) / 60)
    const s = totalseconds % 60
    return { hours: h, minutes: m, seconds: s }
  }, [totalseconds])

  // Прогресс для прогресс-бара
  const progress = useMemo(() => {
    if (initialSeconds === 0) return 0
    return ((initialSeconds - totalseconds) / initialSeconds) * 100
  }, [totalseconds, initialSeconds])

  const startTimer = () => {
    if (refTimer.current || totalseconds <= 0) return
    setIsRunning(true)
    refTimer.current = setInterval(() => {
      setTotalSeconds(prev => {
        if (prev <= 1) {
          clearInterval(refTimer.current)
          refTimer.current = null
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    setInputMins("") 
    setInputHours("") 
  } 

  const pauseTimer = () => {
    clearInterval(refTimer.current)
    refTimer.current = null
    setIsRunning(false)
  }

  const resetTimer = () => {
    clearInterval(refTimer.current)
    refTimer.current = null
    setTotalSeconds(initialSeconds)
    setIsRunning(false)
    setInputMins("") 
    setInputHours("") 
  }

  const setTimeFromInput = () => {
    const hoursInSec = Number(inputHours) * 3600
    const minsInSec = Number(inputMins) * 60
    const total = hoursInSec + minsInSec

    if (total > 0) {
      setTotalSeconds(total)
      setInitialSeconds(total)
    } else {
      setTotalSeconds(60)
      setInitialSeconds(60)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTimeFromInput()
      e.target.blur() 
    }
  }

  useEffect(() => {
    return () => clearInterval(refTimer.current)
  }, [])

  return(
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Таймер</h2>
          <p className="text-gray-300">Обратный отсчет</p>
        </div>

        {/* Таймер */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-white/20 rounded-2xl p-6 mb-6 relative overflow-hidden">
            {/* Прогресс-бар */}
            <div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
            
            <div className="text-6xl font-mono font-bold text-white tracking-wider">
              {hours < 10 ? `0${hours}` : hours}:
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <div className="text-sm text-gray-400 mt-2">часы : минуты : секунды</div>
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="flex gap-3 justify-center mb-6">
          <button 
            onClick={startTimer}
            disabled={isRunning || totalseconds <= 0}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Запустить таймер"
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
            aria-label="Приостановить таймер"
          >
            Пауза
          </button>
          
          <button 
            onClick={resetTimer}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
            aria-label="Сбросить таймер"
          >
            Сброс
          </button>
        </div>

        {/* Установка времени */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white text-center">Установить время</h3>
          
          <div className="flex gap-3">
            <TimeInput
              id="hours"
              label="Часы"          
              value={inputHours}
              onChange={setInputHours}
              onBlur={setTimeFromInput}
              onKeyDown={handleKeyDown}
            />
            <TimeInput
              id="mins"
              label="Минуты"
              value={inputMins}
              onChange={setInputMins}
              onBlur={setTimeFromInput}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Прогресс */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-3 text-center">Прогресс</h3>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-300">
            {Math.round(progress)}% завершено
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountDownTimer