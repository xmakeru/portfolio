'use client'
import TaskColumn from "./TaskColumn"
import Notebook from "./Notebook"
import { useTasksStore } from "@/store/useTasksStore"
import { DndContext } from "@dnd-kit/core"
import Basket from "./Basket"

function TodoPage() {
  const moveTask = useTasksStore((state) => state.moveTask)
  const deleteTask = useTasksStore((state) => state.deleteTask)
  const tasks = useTasksStore((state) => state.tasks)

  function handleDragEvent(event) {
    const {active, over} = event

    if (!over) return 

    const taskId = active.id
    const newStatus = over.id

    if (newStatus === "del") {
      const taskToDelete = tasks.find(task => task.id === taskId)
      if (taskToDelete) {
        deleteTask(taskToDelete)
      }
    } else {
      moveTask(taskId, newStatus)
    }
  }

  
   return (
     <main 
       className="flex flex-col min-h-[calc(100vh-72px)] overflow-clip items-center bg-gradient-to-br from-gray-900 via-green-900 to-blue-900"
       aria-label="Страница управления задачами"
     >
      <h1 className="text-white text-4xl font-bold">Доска задач</h1>
      <p className="text-white">Управляйте своими задачами</p>
      <DndContext
      onDragEnd={handleDragEvent}>
        <div 
          className="flex w-full mt-2"
          role="application"
          aria-label="Доска задач с возможностью перетаскивания"
        >
          <TaskColumn id="active" title="Активные" />
          <TaskColumn id="in-progress" title="В процессе" />
          <TaskColumn id="done" title="Завершенные" />
        </div>
        <Basket id="del"/>
      </DndContext>
      <Notebook />
    </main>
  )
}

export default TodoPage