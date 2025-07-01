'use client'
import TaskColumn from "./TaskColumn"
import Notebook from "./Notebook"
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { useTasksStore } from "@/store/useTasksStore"

function TodoPage() {
  const tasks = useTasksStore((state) => state.tasks)
  const moveTask = useTasksStore((state) => state.moveTask)

 const handleDragEnd = (event) => {
    const {active, over} = event

    if (!over || active.id === over.id) return

    if (active.data.current?.sortable.containerId !== over.data.current?.sortable.containerId) {
      moveTask(active.id, over.data.current?.sortable.containerId)
      return
    }

    const oldIndex = tasks.findIndex(task => task.id === active.id)
    const newIndex = tasks.findIndex(task => task.id === over.id)
    
    if (oldIndex !== newIndex) {
      useTasksStore.getState().setTasks(arrayMove(tasks, oldIndex, newIndex))
    }
  }

  return (
   <DndContext
   onDragEnd={handleDragEnd}
   collisionDetection={closestCorners} //алгоритм обнаружения столкновений - ближайшие углы
   >
     <main className="flex h-screen">
      <div className="flex w-full">
        <TaskColumn status="active" title="Активные" />
        <TaskColumn status="in-progress" title="В процессе" />
        <TaskColumn status="completed" title="Завершенные" />
      </div>
      <Notebook />
    </main>
   </DndContext>
  )
}

export default TodoPage