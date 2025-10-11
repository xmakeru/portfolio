'use client'
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function AnimationBlock({
  children,
  delay = 0,
  className = ""
}) {
  const blockRef = useRef(null)
  const isInView = useInView(blockRef, { once: false, })

  return (
    <motion.div
      ref={blockRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: isInView ? 0.7 : 0, // Анимация появления длинная, исчезновения мгновенная
        ease: "easeOut",
        delay: isInView ? delay : 0 // Задержка только при появлении
      }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  )
}