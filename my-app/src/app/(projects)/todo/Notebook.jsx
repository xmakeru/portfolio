'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasksStore } from '@/store/useTasksStore';

function Notebook() {
  const [isHidden, setIsHidden] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const addTask = useTasksStore((state) => state.addTask)

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

  return (
    <>
      <motion.div
        className="fixed inset-x-0 bottom-0 flex justify-center z-41"
        initial={false}
        animate={{
          y: isHidden ? '80%' : 0 
        }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="w-[600px] h-[500px] p-6 bg-gray-300 relative rounded-t-lg shadow-xl">
          <button 
            onClick={() => setIsHidden(!isHidden)}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-400 px-4 py-1 rounded-t-lg text-white"
          >
            {isHidden ? 'Показать' : 'Скрыть'}
          </button>
          
          <div 
          className="bg-yellow-200 h-[90%] flex flex-col">
            <textarea
            disabled={isHidden}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className={`${isHidden ? "cursor-no-drop" : "cursor-text"}
            w-full h-full resize-none p-4`}
            placeholder='Добавить новый таск здесь'/>
          </div>
            <div className='flex justify-center items-center'>
              <button
              onClick={addNewTask}
              className=''
              >
              Повесить на доску
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
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Notebook;