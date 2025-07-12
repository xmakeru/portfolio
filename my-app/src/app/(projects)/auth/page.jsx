'use client'

import { useState, useEffect } from 'react'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import UserProfile from '@/components/auth/UserProfile'
import useAuthStore from '@/store/useAuthStore'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { isAuthenticated, user } = useAuthStore()

  // Если пользователь авторизован, показываем профиль
  if (isAuthenticated && user) {
    return (
      <main className="min-h-[calc(100vh-72px)] flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="w-full max-w-4xl">
          <UserProfile />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-72px)] flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="w-full max-w-4xl">
       
        {/* Контент */}
        <div className="relative z-10">
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Это демо-версия системы авторизации для портфолио</p>
          <p className="mt-2">
            Используйте тестовые данные для входа или создайте новый аккаунт
          </p>
        </div>
      </div>
    </main>
  )
}