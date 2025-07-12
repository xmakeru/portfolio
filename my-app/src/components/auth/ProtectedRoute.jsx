'use client'

import { useEffect } from 'react'
import useAuthStore from '@/store/useAuthStore'

export default function ProtectedRoute({ children, fallback = null }) {
  const { isAuthenticated, user } = useAuthStore()

  // Если пользователь не авторизован, показываем fallback или редиректим
  if (!isAuthenticated || !user) {
    if (fallback) {
      return fallback
    }
    
    // Простой fallback с кнопкой входа
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Требуется авторизация</h2>
            <p className="text-gray-300 mb-6">
              Для доступа к этой странице необходимо войти в систему
            </p>
            <button
              onClick={() => window.location.href = '/auth'}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    )
  }

  return children
} 