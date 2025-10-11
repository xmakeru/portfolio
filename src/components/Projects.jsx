'use client'
import { PROJECTS_LINKS } from "@/config/links"
import { motion } from "framer-motion"
import Link from "next/link"

// Иконки для проектов
const getProjectIcon = (title) => {
  switch(title.toLowerCase()) {
    case 'timer':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'todo':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    case 'auth':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    case 'game':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'post-list':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    case 'shop':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    default:
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
  }
}

// Цвета для проектов
const getProjectColors = (title) => {
  switch(title.toLowerCase()) {
    case 'timer':
      return {
        bg: 'from-blue-500/20 to-purple-500/20',
        border: 'border-blue-500/30',
        hover: 'hover:from-blue-500/30 hover:to-purple-500/30',
        icon: 'text-blue-400'
      }
    case 'todo':
      return {
        bg: 'from-green-500/20 to-emerald-500/20',
        border: 'border-green-500/30',
        hover: 'hover:from-green-500/30 hover:to-emerald-500/30',
        icon: 'text-green-400'
      }
    case 'auth':
      return {
        bg: 'from-purple-500/20 to-pink-500/20',
        border: 'border-purple-500/30',
        hover: 'hover:from-purple-500/30 hover:to-pink-500/30',
        icon: 'text-purple-400'
      }
    case 'game':
      return {
        bg: 'from-yellow-500/20 to-orange-500/20',
        border: 'border-yellow-500/30',
        hover: 'hover:from-yellow-500/30 hover:to-orange-500/30',
        icon: 'text-yellow-400'
      }
    case 'post-list':
      return {
        bg: 'from-indigo-500/20 to-blue-500/20',
        border: 'border-indigo-500/30',
        hover: 'hover:from-indigo-500/30 hover:to-blue-500/30',
        icon: 'text-indigo-400'
      }
    case 'shop':
      return {
        bg: 'from-red-500/20 to-pink-500/20',
        border: 'border-red-500/30',
        hover: 'hover:from-red-500/30 hover:to-pink-500/30',
        icon: 'text-red-400'
      }
    default:
      return {
        bg: 'from-gray-500/20 to-gray-600/20',
        border: 'border-gray-500/30',
        hover: 'hover:from-gray-500/30 hover:to-gray-600/30',
        icon: 'text-gray-400'
      }
  }
}

export default function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Список доступных проектов">
      {PROJECTS_LINKS.map((project, index) => {
        const colors = getProjectColors(project.title)
        const isInDevelopment = project.title.includes('в разработке')
        
        return (
          <Link 
            href={project.link} 
            key={project.id} 
            className="block w-full h-full"
            aria-label={`Перейти к проекту: ${project.title}`}
          >
            <motion.div
              className="relative cursor-pointer overflow-hidden w-full h-full group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              role="listitem"
            >
              <div className={`
                bg-gradient-to-br ${colors.bg} ${colors.hover}
                border ${colors.border}
                backdrop-blur-sm rounded-2xl p-6
                transition-all duration-200 ease-out
                transform-gpu
                ${isInDevelopment ? 'opacity-60' : ''}
                h-full flex flex-col
              `}>
                {/* Иконка */}
                <div className={`${colors.icon} mb-4 transition-transform duration-200 group-hover:scale-110`}>
                  {getProjectIcon(project.title)}
                </div>
                
                {/* Заголовок */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-200">
                  {project.title.replace(' (в разработке)', '')}
                </h3>
                
                {/* Статус */}
                {isInDevelopment && (
                  <div className="flex w-fit items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 mb-4">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                    В разработке
                  </div>
                )}

                {/* Стрелка */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Link>
        )
      })}
    </div>
  )
}
