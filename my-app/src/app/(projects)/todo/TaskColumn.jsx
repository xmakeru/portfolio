'use client'
import { useTasksStore } from "@/store/useTasksStore"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { motion } from "framer-motion"
import TaskCard from "./TaskCard"

function TaskColumn({status, title}) {
  const tasks = useTasksStore((state) => state.tasks)
  const filteredTasks = tasks.filter(task => task.status === status)
  
  // Вычисляем количество заполняющих блоков (0, 1 или 2)
  const remainder = filteredTasks.length % 3
  const fillersCount = remainder === 0 ? 0 : 3 - remainder

  return (
    <div className="border-r border-[#BA5624] border-dashed flex-1 w-1/3 pl-10 text-white flex flex-col">
      <h2 className="text-xl">{title}</h2>
      <div className="flex flex-col mt-2 h-full">
        <div className="grid grid-cols-3 gap-4 w-[95%] auto-rows-min">

          <SortableContext items={filteredTasks} strategy={rectSortingStrategy} id={status}>
            {filteredTasks.map((task) => (
            <TaskCard id={task.id} title={task.title} key={task.id} status={status}/>
          ))}
          </SortableContext>
          
          {filteredTasks.length > 0 && Array(fillersCount).fill().map((_, index) => (
            <div 
              key={`filler-${index}`}
              className="border-dashed border-[#BA5624] border p-2 text-gray-400 
              flex items-center justify-center min-h-[150px]"
            >
              + Перетащите таск из другой колонки
            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="border-dashed border-[#BA5624] border p-2 text-gray-400 
            flex items-center justify-center min-h-[150px]">
              + Перетащите таск из другой колонки
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskColumn
