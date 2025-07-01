// useFormState - это React-хук для управления состоянием форм с серверными действиями.

// const [state, formAction] = useFormState(action, initialState)
// action: ваша server action (addTask)
// initialState: начальное состояние (обычно null)
// Возвращает:
// state: результат выполнения action
// formAction: модифицированное действие для формы

// 'use client'
// import { useFormState } from 'react-dom'
// import { addTask } from '../actions'

// export default function Form() {
//   const [state, formAction] = useFormState(addTask, null)

//   return (
//     <form action={formAction}>
//       <input name="taskText" />
//       {state?.error && <p>{state.error}</p>}
//       <button>Добавить</button>
//     </form>
//   )
// }

// Как работает:
// Форма отправляется на сервер

// Сервер выполняет addTask

// Результат возвращается в state

// Компонент автоматически перерендеривается с новым состоянием

// Преимущества перед ручным управлением:
// Встроенная обработка состояний загрузки/ошибок

// Работает с отключенным JavaScript (прогрессивное улучшение)