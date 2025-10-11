import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Состояние
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Действия
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        
        // Имитация задержки запроса
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Тестовые данные для демонстрации
        const testUsers = [
          { email: 'admin@test.com', password: 'admin123', name: 'Администратор', role: 'admin' },
          { email: 'user@test.com', password: 'user123', name: 'Пользователь', role: 'user' },
          { email: 'demo@test.com', password: 'demo123', name: 'Демо пользователь', role: 'user' }
        ]
        
        const user = testUsers.find(u => u.email === email && u.password === password)
        
        if (user) {
          const userData = {
            id: Date.now(),
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
            createdAt: new Date().toISOString()
          }
          
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
          
          return { success: true, user: userData }
        } else {
          set({
            isLoading: false,
            error: 'Неверный email или пароль'
          })
          
          return { success: false, error: 'Неверный email или пароль' }
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null })
        
        // Имитация задержки запроса
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Проверка на существующий email
        const existingUser = get().user?.email === email
        
        if (existingUser) {
          set({
            isLoading: false,
            error: 'Пользователь с таким email уже существует'
          })
          return { success: false, error: 'Пользователь с таким email уже существует' }
        }
        
        const userData = {
          id: Date.now(),
          email,
          name,
          role: 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          createdAt: new Date().toISOString()
        }
        
        set({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
        
        return { success: true, user: userData }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
      },

      clearError: () => {
        set({ error: null })
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)

export default useAuthStore