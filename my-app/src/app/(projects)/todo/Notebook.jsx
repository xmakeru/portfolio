'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTasksStore } from '@/store/useTasksStore'

function Notebook() {
  const [isHidden, setIsHidden] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const addTask = useTasksStore((state) => state.addTask)
  const notebookRef = useRef(null)

  const addNewTask = () => {
    if (inputValue.trim() === "") return
    const newTask = {
      id: Math.random(),
      title: inputValue,
      status: "active",
    }
    addTask(newTask)
    setInputValue("")
  }

  const handleOverlayClick = () => {
    setIsHidden(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      addNewTask()
    }
  }

  return (
    <>
      <motion.div
        ref={notebookRef}
        className="fixed inset-x-0 bottom-0 flex flex-col justify-center items-center z-49"
        initial={false}
        animate={{
          y: isHidden ? '85%' : 0 
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        {/* Кнопка переключения */}
        <button 
          onClick={() => setIsHidden(!isHidden)}
          className="
            bg-gradient-to-r from-blue-500 to-purple-500 
            px-6 py-4 rounded-t-2xl text-white w-[600px] 
            font-medium shadow-lg
            transition-all duration-300 ease-out
            hover:from-blue-600 hover:to-purple-600 
            hover:shadow-xl hover:shadow-blue-500/25
            hover:scale-105 transform-gpu
            flex items-center justify-center gap-2
            group
          "
        >
          <svg className={`w-5 h-5 transition-transform duration-300 ${isHidden ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="transition-all duration-300 group-hover:scale-105">
            {isHidden ? 'Добавить задачу' : 'Скрыть блокнот'}
          </span>
        </button>
        
        {/* Основной контент */}
        <div className="w-[600px] h-[500px] p-6 bg-gray-300 relative shadow-xl rounded-b-2xl">
          <div className="bg-yellow-200 h-[90%] flex flex-col rounded-lg overflow-hidden">
            <textarea
              disabled={isHidden}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              value={inputValue}
              className={`
                ${isHidden ? "cursor-not-allowed opacity-50" : "cursor-text"}
                w-full h-full resize-none p-4
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-inset
                hover:bg-yellow-100
                placeholder-gray-500
              `}
              placeholder="Опишите вашу задачу здесь... (Ctrl+Enter для добавления)"
            />
          </div>
          
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={addNewTask}
              disabled={!inputValue.trim() || isHidden}
              className="
                bg-gradient-to-r from-green-500 to-emerald-600 
                text-white py-3 px-6 rounded-xl font-medium
                transition-all duration-300 ease-out
                hover:from-green-600 hover:to-emerald-700 
                hover:shadow-lg hover:shadow-green-500/25
                hover:scale-105 transform-gpu
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100
                flex items-center gap-2
                group
              "
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="transition-all duration-300 group-hover:scale-105">
                Добавить задачу
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {!isHidden && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={handleOverlayClick}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Notebook