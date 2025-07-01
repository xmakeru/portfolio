// В серверном фетче состояние ошибки и загрузки обрабатывается и выводится автоматически через соответствующие файлы в папке
// В клиентском фетче этим надо управлять вручную (прослеживание и прокидывание,try-catch-finally)
// Клиентский юзать только когда есть супер необходимость

export default async function UsersServer() {
  const response = await fetch('users')
  const users = await response.json()

  return(
    <ul>
      {users.map((i, index) => (
        <li
        key={index}>
          {i}
        </li>
      ))}
    </ul>
  )
  
}