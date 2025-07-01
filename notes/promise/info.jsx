// Promise = Объект, в котором хранится результат асинхронной операции. Помогает избежать ад колбеков и делает код более читаемым. 

// const promise = new Promise((resolve, reject) => {
//   // Асинхронная операция (например, запрос к API)
//   if (/* операция успешна */) {
//     resolve('Успех!'); // Передаем результат
//   } else {
//     reject('Ошибка!'); // Передаем ошибку
//   }
// });

// resolve — вызывается при успешном завершении.
// reject — вызывается при ошибке.

// Имитация запроса к серверу
// function fetchData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = { id: 1, name: "John" };
//       resolve(data); // Успех!
//       // reject("Сервер не отвечает"); // Ошибка
//     }, 1000);
//   });
// }
// // Использование
// fetchData()
//   .then(data => console.log("Данные:", data))
//   .catch(error => console.error("Ошибка:", error));

// function fetchUserData(userId) {
//   return new Promise((resolve) => {  // 1. Создаём "контейнер" для результата
//     fetchUsername(userId)            // 2. Запрашиваем юзернейм
//       .then(username => {            // 3. Когда юзернейм получен...
//         return fetchAvatar(username); // 4. ...запрашиваем аватарку
//       })
//       .then(avatar => {              // 5. Когда аватарка получена...
//         resolve({ username, avatar }); // 6. Отдаём ВСЁ вместе
//       });
//   });
// }

// Промисы можно объединять в цепочки через .then (как и fetch)
// new Promise((resolve) => resolve(10))
//   .then(num => num * 2) // 20
//   .then(num => num + 5) // 25
//   .then(console.log); // 25

// fetch уже возвращает промис