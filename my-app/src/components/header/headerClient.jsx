'use client'

import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function AnimatedHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [isVisible, setIsVisible] = useState(false) 
  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)
  const isInitialLoad = useRef(true)

  const animationProps = isHomePage
  ? {
      initial: { y: -100, opacity: 0 },
      animate: { y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 },
      transition: {
        type: "spring",
        stiffness: isInitialLoad.current ? 50 : 70,
        damping: 12,
      },
    }
  : {}


  useEffect(() => {
    if (isHomePage) {
      setIsVisible(true)
    }
  }, [isHomePage])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current
    const isScrollingUp = latest < previous
    
    if (isScrollingUp || latest < 50) {
      setIsVisible(true)
    } else if (latest > 100 && latest > previous) {
      setIsVisible(false)
    }
    
    lastScrollY.current = latest
    isInitialLoad.current = false
  })

  if (!isHomePage) return null

  return (
    <motion.div
      {...animationProps}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="p-6 bg-gradient-to-r from-amber-600 to-yellow-400 w-4/5 mx-auto my-4 rounded-2xl">
        <nav aria-label="Навигация">
          <ul className="flex justify-between items-center">
              <li className="">
                <Link 
                  href="https://github.com/xmakeru" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Перейти на GitHub профиль"
                >
                  GitHub
                </Link>
              </li>
              <li className="">
                <Link 
                  href="https://t.me/xmakeru" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Перейти в Telegram"
                >
                  Telegram
                </Link>
              </li>
          </ul>
        </nav>
      </div>
    </motion.div>
  )
}