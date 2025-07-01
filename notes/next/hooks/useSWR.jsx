// Хук из библиотеки SWR (Stale-While-Revalidate) для управления состоянием данных с кешированием и автоматическим ревалидацией.

// npm install swr

// 'use client'
// import useSWR from 'swr'

// function Profile() {
//   const { data, error, isLoading, mutate } = useSWR(
//     '/api/user',          // Ключ кеша
//     fetcher,              // Функция получения данных
//     {
//       revalidateOnFocus: true, // Автообновление при возврате на вкладку
//       refreshInterval: 3000    // Обновление каждые 3 секунды
//     }
//   )

//   if (error) return <div>Failed to load</div>
//   if (isLoading) return <div>Loading...</div>

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <button onClick={() => mutate()}>Refresh data</button>
//     </div>
//   )
// }

// // Стандартная функция получения данных
// async function fetcher(url) {
//   const res = await fetch(url)
//   return res.json()
// }

// Автоматическое кеширование данных
// Фоновая ревалидация при возврате на страницу
// Ручное обновление через mutate()
// Оптимистичные обновления:

// mutate(updatedData, {
//   optimisticData: newData,
//   rollbackOnError: true
// })