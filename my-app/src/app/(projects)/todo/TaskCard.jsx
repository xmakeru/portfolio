'use client'
import { useDraggable } from "@dnd-kit/core"

function TaskCard({ title, id, status }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({id:id})

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px) scale(1.05)`,
      }
    : undefined

  const getCardStyle = () => {
    switch(status) {
      case 'active':
        return 'bg-yellow-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105 z-49'
      case 'in-progress':
        return 'bg-pink-300 hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105 z-49'
      case 'done':
        return 'bg-green-300 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 z-49'
      default:
        return 'bg-gray-300 hover:bg-gray-400 hover:shadow-lg hover:scale-105 z-49'
    }
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`
        ${getCardStyle()}
        min-h-[150px] p-4 text-black flex flex-col break-words cursor-grab overflow-hidden
        rounded-lg border border-white/20
        transition-all duration-300 ease-out
        transform-gpu
        hover:border-opacity-40
        active:cursor-grabbing
        group
      `}
      role="button"
      tabIndex={0}
      aria-label={`Задача: ${title}`}
    >
      <p className="whitespace-normal word-break-break-word font-medium leading-relaxed group-hover:text-gray-800 transition-colors duration-200">
        {title}
      </p>
      
      {/* Индикатор статуса */}
      <div className="mt-auto pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
            status === 'active' ? 'bg-yellow-600 group-hover:bg-yellow-700' :
            status === 'in-progress' ? 'bg-pink-600 group-hover:bg-pink-700' :
            status === 'done' ? 'bg-green-600 group-hover:bg-green-700' :
            'bg-gray-600'
          }`}></div>
          <span className="text-xs opacity-70 capitalize font-medium">
            {status === 'in-progress' ? 'в процессе' : status}
          </span>
        </div>
        
        {/* Иконка перетаскивания */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
