// позволяет мгновенно обновлять UI до подтверждения успешности серверного действия.

// const [optimisticState, addOptimistic] = useOptimistic(
//   currentState,
//   updateFunction
// )

// 'use client'
// import { useOptimistic } from 'react'
// import { sendMessage } from './actions'

// function Chat({ messages }) {
//   const [optimisticMessages, addOptimisticMessage] = useOptimistic(
//     messages,
//     (state, newMessage) => [
//       ...state,
//       {
//         text: newMessage,
//         sending: true // Флаг, что сообщение еще отправляется
//       }
//     ]
//   )

//   async function handleSubmit(formData) {
//     const message = formData.get('message')
//     addOptimisticMessage(message) // Мгновенное отображение
//     await sendMessage(message)   // Фактическая отправка
//   }

//   return (
//     <div>
//       {optimisticMessages.map((msg, i) => (
//         <div key={i} className={msg.sending ? 'opacity-50' : ''}>
//           {msg.text}
//         </div>
//       ))}
//       <form action={handleSubmit}>
//         <input type="text" name="message" />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   )
// }

// Мгновенный отклик UI
// Автоматическое возвращение к предыдущему состоянию при ошибке
// Встроенная в React, не требует дополнительных библиотек