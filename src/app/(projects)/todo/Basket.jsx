'use client'
import { useDroppable } from "@dnd-kit/core"
import styles from './Basket.module.css'

function Basket() {
  const { setNodeRef, isOver } = useDroppable({ id: "del" })

  return (
    <div
      ref={setNodeRef}
      className={`${styles.basket} ${isOver ? styles['basket--over'] : styles['basket--default']} ${styles['basket--hover']}`}
      aria-label="Корзина для удаления задач"
    >
      <span className={`${styles.basket__icon} ${isOver ? styles['basket__icon--over'] : styles['basket__icon--default']}`}>
        {isOver ? 'del' : '🗑️'}
      </span>

      {isOver && <div className={styles.basket__pulse}></div>}
    </div>
  )
}

export default Basket
