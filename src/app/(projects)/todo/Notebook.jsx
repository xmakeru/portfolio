'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTasksStore } from '@/store/useTasksStore'
import styles from './Notebook.module.css'

function Notebook() {
  const [isHidden, setIsHidden] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const addTask = useTasksStore((state) => state.addTask)
  const notebookRef = useRef(null)

  const addNewTask = () => {
    if (!inputValue.trim()) return
    addTask({ id: Math.random(), title: inputValue, status: "active" })
    setInputValue("")
  }

  const handleOverlayClick = () => setIsHidden(true)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addNewTask()
  }

  return (
    <>
      <motion.div
        ref={notebookRef}
        className={styles.notebook}
        initial={false}
        animate={{ y: isHidden ? '85%' : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        {/* Кнопка переключения */}
        <button 
          onClick={() => setIsHidden(!isHidden)}
          className={styles['notebook__toggle']}
        >
          <svg
            className={`${styles['notebook__toggle-icon']} ${isHidden ? styles['notebook__toggle-icon--hidden'] : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className={styles['notebook__toggle-text']}>
            {isHidden ? 'Добавить задачу' : 'Скрыть блокнот'}
          </span>
        </button>

        {/* Основной контент */}
        <div className={styles['notebook__content']}>
          <div className={styles['notebook__textarea-wrapper']}>
            <textarea
              disabled={isHidden}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              value={inputValue}
              className={`${styles['notebook__textarea']} ${isHidden ? styles['notebook__textarea--disabled'] : styles['notebook__textarea--enabled']}`}
              placeholder="Опишите вашу задачу здесь... (Ctrl+Enter для добавления)"
            />
          </div>

          <div className="flex justify-center items-center mt-4">
            <button
              onClick={addNewTask}
              disabled={!inputValue.trim() || isHidden}
              className={styles['notebook__button']}
            >
              <svg
                className={styles['notebook__button-icon']}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Добавить задачу</span>
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
            className={styles['notebook__overlay']}
            onClick={handleOverlayClick}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Notebook
