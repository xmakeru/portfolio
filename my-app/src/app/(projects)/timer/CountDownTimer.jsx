'use client'
import '../styles.css';
import { useState, useEffect, useRef, useMemo } from "react"
import TimeInput from './TimeInput';
import { useTransform, useMotionValue } from 'framer-motion';


function CountDownTimer() {
  const [totalseconds, setTotalSeconds] = useState(60)
  const refTimer = useRef()
  const [inputMins, setInputMins] = useState("")
  const [inputHours, setInputHours] = useState("")  

  const { hours, minutes, seconds } = useMemo(() => {
    const h = Math.floor(totalseconds / 3600);
    const m = Math.floor((totalseconds % 3600) / 60);
    const s = totalseconds % 60;
    return { hours: h, minutes: m, seconds: s };
  }, [totalseconds]);


  const startTimer = () => {
    if (refTimer.current) return
    refTimer.current = setInterval(() => {
      setTotalSeconds(prev => {
    if (prev <= 1) {
      clearInterval(refTimer.current);
      refTimer.current = null;
      return 0;
       }
        return prev - 1;
      });
    }, 1000);
    if (refTimer.current || totalseconds <= 0) return;
    setInputMins("") 
    setInputHours("") 
  } 

  const pauseTimer = () => {
    clearInterval(refTimer.current)
    refTimer.current = null;
  }

  const resetTimer = () => {
    clearInterval(refTimer.current)
    refTimer.current = null;
    setTotalSeconds(60)
    setInputMins("") 
    setInputHours("") 
  }

  const setTimeFromInput = () => {
    const hoursInSec = Number(inputHours) * 3600
    const minsInSec = Number(inputMins) * 60
    const total = hoursInSec + minsInSec

    if (total > 0) {
      setTotalSeconds(total)
    } else {
      setTotalSeconds(60)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTimeFromInput()
      e.target.blur() 
    }
  }

  useEffect(() => {
    return () => clearInterval(refTimer.current);
  }, []);


  return(
    <div className='relative w-full md:w-auto'>
      <h2 className="text-center mb-4 text-2xl">count down</h2>
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

       <div className="flex gap-4">
        <TimeInput
          id="hours"
          label="hours"          
          value={inputHours}
          onChange={setInputHours}
          onBlur={setTimeFromInput}
          onKeyDown={handleKeyDown}
        />
        <TimeInput
          id="mins"
          label="mins"
          value={inputMins}
          onChange={setInputMins}
          onBlur={setTimeFromInput}
          onKeyDown={handleKeyDown}
        />
        <button onClick={setTimeFromInput}>set</button>
      </div>


      </div>
      {/* <div className='absolute h-4 bg-amber-700 bottom-0 left-0 rounded-b w-full flex items-center justify-center'></div> */}
    </div>

  )
}

export default CountDownTimer