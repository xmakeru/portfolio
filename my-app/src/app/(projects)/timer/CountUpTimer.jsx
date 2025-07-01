'use client'
import '../styles.css';
import { useState, useEffect, useRef } from "react"


function CountUpTimer() {
  const [totalseconds, setTotalSeconds] = useState(0)
  const refTimer = useRef()

  const hours = Math.floor(totalseconds / 3600)
  const minutes = Math.floor((totalseconds % 3600) / 60)
  const seconds = totalseconds % 60

  const startTimer = () => {
    if (refTimer.current) return
    refTimer.current  = setInterval(() => {
      setTotalSeconds(prev => prev + 1)
    }, 1000)
  } 

  const pauseTimer = () => {
    clearInterval(refTimer.current)
    refTimer.current = null;
  }

  const resetTimer = () => {
    clearInterval(refTimer.current)
    refTimer.current = null;
    setTotalSeconds(0)
  }

  useEffect(() => {
  return () => clearInterval(refTimer.current);
}, []);

  return(
    <div className='relative w-full md:w-auto'>
      <h2 className="text-center mb-4 text-2xl">count up</h2>
      <div className="timer-container">
        <span className="bg-gray-700 rounded-xl text-4xl p-3">
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
        <div className="button-container">
          <button onClick={startTimer}>start</button>
          <button onClick={pauseTimer}>pause</button>
          <button onClick={resetTimer}>reset</button>
        </div>
        <div className="">
          
        </div>
      </div>
    </div>
  )
}

export default CountUpTimer