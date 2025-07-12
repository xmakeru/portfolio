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
      </div>
    </main>
  )
}