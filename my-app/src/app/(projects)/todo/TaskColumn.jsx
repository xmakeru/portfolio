'use client'
import { useTasksStore } from "@/store/useTasksStore"
import TaskCard from "./TaskCard"
import { useDroppable } from "@dnd-kit/core"

function TaskColumn({id, title}) {
  const {setNodeRef, isOver} = useDroppable({id: id})
  const tasks = useTasksStore((state) => state.tasks)
  const filteredTasks = tasks.filter(task => task.status === id)

  const getColumnColors = () => {
    switch(id) {
      case 'active':
        return {
          border: 'border-yellow-500/50',
          hoverBorder: 'hover:border-yellow-400/70',
          title: 'text-yellow-400',
          bg: 'bg-yellow-500/5'
        }
      case 'in-progress':
        return {
          border: 'border-pink-500/50',
          hoverBorder: 'hover:border-pink-400/70',
          title: 'text-pink-400',
          bg: 'bg-pink-500/5'
        }
      case 'done':
        return {
          border: 'border-green-500/50',
          hoverBorder: 'hover:border-green-400/70',
          title: 'text-green-400',
          bg: 'bg-green-500/5'
        }
      default:
        return {
          border: 'border-gray-500/50',
          hoverBorder: 'hover:border-gray-400/70',
          title: 'text-gray-400',
          bg: 'bg-gray-500/5'
        }
    }
  }

  const colors = getColumnColors()

  return (
    <div className={`border-r ${colors.border} ${colors.hoverBorder} border-dashed flex-1 mx-2 text-white flex flex-col transition-all duration-300 ease-out hover:bg-white/5 rounded-lg p-4 group`}>
      <h2 className={`text-xl font-bold ${colors.title} transition-colors duration-200 transform-gpu`}>
        {title}
      </h2>
      
      <div className="flex flex-col mt-2 h-full">
        <div 
          ref={setNodeRef}
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-[95%] auto-rows-min transition-all duration-300 ${
            isOver ? `${colors.bg} border-2 border-dashed ${colors.border} rounded-lg p-2` : ''
          }`}
        >
          {filteredTasks.map((task) => (
            <TaskCard id={task.id} title={task.title} key={task.id} status={id}/>
          ))}

          <div 
            className={`border-dashed border-[#BA5624] border p-2 text-gray-400 text-3xl
              flex items-center justify-center min-h-[150px] cursor-pointer 
              transition-all duration-300 ease-out
              hover:bg-[#BA5624]/10 hover:border-[#BA5624] hover:text-[#BA5624] hover:scale-105
              transform-gpu
              ${isOver ? 'bg-[#BA5624]/20 border-[#BA5624] text-[#BA5624] scale-105' : 'text-gray-400'}`}
            aria-label="Добавить новую задачу"
          >
            <div className="transition-all duration-300 hover:rotate-90">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskColumn
