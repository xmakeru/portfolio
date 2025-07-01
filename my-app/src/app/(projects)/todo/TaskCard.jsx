'use client'
import { useSortable } from "@dnd-kit/sortable"
import { motion, scale } from "framer-motion"
import {CSS} from "@dnd-kit/utilities"

function TaskCard({ id, title, status }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: {
      type: "task",
      status: status
    },
  })
  
  const style = {
    transition, 
    transform: transform ? CSS.Transform.toString(transform) : undefined,
  }

  return (
    <motion.div
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={style}
    className="bg-yellow-200 min-h-[150px] p-2 text-black
    flex flex-col break-words cursor-grab overflow-hidden"
  >
    <p className="whitespace-normal word-break-break-word">
      {title}
    </p>
  </motion.div>
)
}

export default TaskCard
