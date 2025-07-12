'use client'
import { useDroppable } from "@dnd-kit/core"

function Basket() {
  const {setNodeRef, isOver} = useDroppable({id: "del"})

  return(
    <div
      ref={setNodeRef}
      className={`
        p-10 rounded-full fixed bottom-10 right-10 z-10 
        transition-all duration-300 ease-out
        cursor-pointer
        transform-gpu
        hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50
        ${isOver 
          ? 'bg-red-600 scale-125 shadow-2xl shadow-red-500/50 rotate-12' 
          : 'bg-red-500 hover:bg-red-600'
        }
        group
      `}
      aria-label="Корзина для удаления задач"
    >
      <span className={`
        text-white font-bold text-xl
        transition-all duration-300 ease-out
        ${isOver 
          ? 'scale-110 rotate-12' 
          : 'group-hover:scale-110 group-hover:rotate-6'
        }
        block
      `}>
        {isOver ? 'del' : '🗑️'}
      </span>
      
      {/* Пульсирующий эффект при наведении */}
      {isOver && (
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
      )}
    </div>
  )
}

export default Basket 