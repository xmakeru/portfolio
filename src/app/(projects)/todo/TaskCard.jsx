'use client'
import { useDraggable } from "@dnd-kit/core"
import styles from './TaskCard.module.css'

export default function TaskCard({ title, id, status }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px) scale(1.05)` }
    : undefined

  const getCardModifier = () => {
    switch(status) {
      case 'active': return styles['card--active']
      case 'in-progress': return styles['card--in-progress']
      case 'done': return styles['card--done']
      default: return styles['card--default']
    }
  }

  const getStatusIndicatorModifier = () => {
    switch(status) {
      case 'active': return styles['card__status-indicator--active']
      case 'in-progress': return styles['card__status-indicator--in-progress']
      case 'done': return styles['card__status-indicator--done']
      default: return styles['card__status-indicator--default']
    }
  }

  const getStatusLabel = () => status === 'in-progress' ? 'в процессе' : status

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`${styles.card} ${getCardModifier()}`}
      role="button"
      tabIndex={0}
      aria-label={`Задача: ${title}`}
    >
      <p className={styles.card__title}>{title}</p>

      <div className={styles.card__status}>
        <div className="flex items-center gap-2">
          <div className={`${styles.card__statusIndicator} ${getStatusIndicatorModifier()}`}></div>
          <span className={styles.card__statusText}>{getStatusLabel()}</span>
        </div>

        <svg className={styles.card__dragIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </div>
    </div>
  )
}