import { create } from "zustand"
import {createJSONStorage, persist, devtools} from "zustand/middleware"
// immer помогает изменять состояние в immer стиле, т.е. не нужно возвращать новый объект, а можно мутировать текущий. Можно использовать просто методы типо push и тд. Надо установить

export const useTasksStore = create(devtools(
  persist(
    (set, get) => ({ //set функция для изменения состояния, get - функция для чтения текущего состояния
      //СОСТОЯНИЯ
      tasks: [],

      setTasks: (tasks) => set({ tasks: tasks }),

      addTask: (task) => {
        set((state) => ({
          tasks: [...state.tasks, task],
        }), false, "addTask") 
      },

      deleteTask: (task) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== task.id),
        }));
      },

      clearTasks: () => {
      set({ tasks: [] }, false, "clearTasks") 
    },

      moveTask: (taskId, newStatus) => {
        set(state => ({
          tasks: state.tasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        }))
      },
      // ex1: () => {
      //   set({tasks: 0}, false, "ex1") // передается объект, с новыми полями стейта
      // }, // можно использовать if и тд

      // ex2: async () => { // асинхронный метод для получения данных
      //   const response = await fetch("https://jsonplaceholder.typicode.com/todos")
      //   const data = await response.json()
      //   set({ tasks: data.slice(0, 10) }) // обновляем состояние с полученными данными
      // },

    }),
    {
      name: "tasksStore", // имя для хранения в localStorage
      storage: createJSONStorage(() => sessionStorage), // используем sessionStorage для хранения состояния
      }
      ),
      {store: 'tasksStore'}
    ))

// Пример использования:
// const tasksStore = useTasksStore(state => state.tasks) - получаем доступ к состоянию и методам, так делать хорошо, мы триггерим объект только при изменении запрашиваемого значения
// const {tasks} = useTasksStore() - так делать плохо, т.к компонент будет ререндериться при каждом изменении в сторе

// const tasks = useTasksStore.getState().tasks -- вне компонента можно, или в обработчике событий, используем когда не нужна реактивность (перерисовка ui при изменении состояния)