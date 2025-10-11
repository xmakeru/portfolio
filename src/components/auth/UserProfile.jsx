'use client'

import { useState } from 'react'
import useAuthStore from '@/store/useAuthStore'

export default function UserProfile() {
  const { user, logout, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(user?.name || '')

  const handleLogout = () => {
    logout()
  }

  const handleSaveProfile = () => {
    if (editName.trim()) {
      updateProfile({ name: editName.trim() })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditName(user?.name || '')
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
            <img
              src={user.avatar}
              alt={`Аватар ${user.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Профиль</h2>
          <p className="text-gray-300">Добро пожаловать!</p>
        </div>

        <div className="space-y-6">
          {/* Информация о пользователе */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Имя
              </label>
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Введите новое имя"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-white text-lg">{user.name}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <p className="text-white">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Роль
              </label>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.role === 'admin' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Дата регистрации
              </label>
              <p className="text-white">
                {new Date(user.createdAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Статистика (можно расширить) */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">Статистика</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">0</p>
                <p className="text-sm text-gray-300">Игр сыграно</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">0</p>
                <p className="text-sm text-gray-300">Побед</p>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="space-y-3">
            {/* <button
              onClick={() => window.location.href = '/game'}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
            >
              Играть
            </button> */}
            
            <button
              onClick={handleLogout}
              className="w-full bg-red-500/20 border border-red-500/30 text-red-300 py-3 px-4 rounded-xl font-medium hover:bg-red-500/30 transition-all duration-200"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 