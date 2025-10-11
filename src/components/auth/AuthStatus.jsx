'use client'

import { useState } from 'react'
import useAuthStore from '@/store/useAuthStore'

export default function AuthStatus() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [showDropdown, setShowDropdown] = useState(false)

  if (!isAuthenticated || !user) {
    return (
      <li>
        <a 
          href="/auth"
          className="text-white hover:text-gray-200 transition-colors font-medium"
        >
          Войти
        </a>
      </li>
    )
  }

  return (
    <li className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
        aria-expanded={showDropdown}
        aria-haspopup="true"
      >
        <img
          src={user.avatar}
          alt={`Аватар ${user.name}`}
          className="w-8 h-8 rounded-full border-2 border-white/20"
        />
        <span className="hidden sm:inline font-medium">{user.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 py-2 z-50">
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-white font-medium">{user.name}</p>
            <p className="text-gray-300 text-sm">{user.email}</p>
          </div>
          
          <a
            href="/auth"
            className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
            onClick={() => setShowDropdown(false)}
          >
            Профиль
          </a>
          
          <button
            onClick={() => {
              logout()
              setShowDropdown(false)
            }}
            className="block w-full text-left px-4 py-2 text-red-300 hover:bg-red-500/20 transition-colors"
          >
            Выйти
          </button>
        </div>
      )}
    </li>
  )
} 