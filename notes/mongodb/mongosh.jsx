// cls - очистить терминал
// PS C:\Users\makeru\Documents\GitHub\Setup\my-app> mongosh -- подключение к локальной базе данных, которая сейчас запущена

// test> show dbs
// test> use admin
// switched to db admin
// admin> use school -- перейти в дб по ее названию или создать если таковой не существует
// switched to db school
// school> db.createCollection("students")-- создать коллекцию
// school> db.createCollection("students", {capped:true, size:1000, max:100}, {autoIndexId:false})-- создать коллекцию, с максимальным размером в байтах, 
// с максимальным количеством документов = 10, отключить автоиндексирование id.
// show collections -- показать коллекции
// school> show dbs
// admin    40.00 KiB
// config  108.00 KiB
// local    40.00 KiB
// school    8.00 KiB
// school> db.drop("students") -- удалить коллекцию
// school> db.dropDatabase() -- удалить базу данных
// { ok: 1, dropped: 'school' }
// school> show dbs
// admin    40.00 KiB
// config  108.00 KiB
// local    40.00 KiB
// test> use school
// switched to db school
// school> db.students.insertOne({name:"Alyona", age:27}) -- создать документ + если коллекция не создана то она будет создана
// {
//   acknowledged: true,
//   insertedId: ObjectId('68406ef8a681185c5750eb68')
// }

// school> db.students.find() -- вывести документы коллекции
// [
//   {
//     _id: ObjectId('68406ef8a681185c5750eb68'),
//     name: 'Alyona',
//     age: 27
//   }
// ]

// school> db.students.insertMany([{name:"Yulya", age:24}, {name:"Ilya", age:21}, {name:"Sonya", age:17}]) -- создать несколько документов
// {
//   acknowledged: true,
//   insertedIds: {
//     '0': ObjectId('68407189a681185c5750eb69'),
//     '1': ObjectId('68407189a681185c5750eb6a'),
//     '2': ObjectId('68407189a681185c5750eb6b')
//   }
// }

// school> db.students.find() -- вернет все документы в этой коллекции
// [
//   {
//     _id: ObjectId('68406ef8a681185c5750eb68'),
//     name: 'Alyona',
//     age: 27
//   },
//   { _id: ObjectId('68407189a681185c5750eb69'), name: 'Yulya', age: 24 },
//   { _id: ObjectId('68407189a681185c5750eb6a'), name: 'Ilya', age: 21 },
//   { _id: ObjectId('68407189a681185c5750eb6b'), name: 'Sonya', age: 17 }
// ]

// school> db.students.insertOne({registerDate: new Date()}) -- создаст текущую дату + время + часовой пояс (2025-06-04T17:15:28.348+00:00)
// {
//   acknowledged: true,
//   insertedId: ObjectId('684072e4a681185c5750eb6c')
// }

// school> db.students.insertOne({name: "Alena", age: 32, gpa: 2.8, fullTime: false, regusterDate: new Date(), -- типы данных
// gradutionDate: null, -- пустое значение, предполагает что в будущем его заполнят
//  courses: ["Biology", "Chemistry"], address: {street: "kulakova", city: "Moscow"}})  -- типы данных
// {
//   acknowledged: true,
//   insertedId: ObjectId('68407f30a681185c5750eb6d')
// }

// school> db.students.find().sort({name:1}) -- сортировка по алфавитному порядку. -1 сортировка наоборот. в {} по какому критерию сортировать
// [
//   {
//     _id: ObjectId('684072e4a681185c5750eb6c'),
//     registerDate: ISODate('2025-06-04T16:23:00.757Z')
//   },
//   {
//     _id: ObjectId('68406ef8a681185c5750eb68'),
//     name: 'Alyona',
//     age: 27
//   },
//   { _id: ObjectId('68407189a681185c5750eb6a'), name: 'Ilya', age: 21 },
//   { _id: ObjectId('68407189a681185c5750eb6b'), name: 'Sonya', age: 17 },
//   { _id: ObjectId('68407189a681185c5750eb69'), name: 'Yulya', age: 24 }
// ]

// school> db.students.find().limit(1)  -- выводимое количество документов (в скобках число)
// [
//   {
//     _id: ObjectId('68406ef8a681185c5750eb68'),
//     name: 'Alyona',
//     age: 27
//   }
// ]

// school> db.students.find().sort({age: 1}).limit(3) -- комбинация методов
// [
//   {
//     _id: ObjectId('684072e4a681185c5750eb6c'),
//     registerDate: ISODate('2025-06-04T16:23:00.757Z')
//   },
//   { _id: ObjectId('68407189a681185c5750eb6b'), name: 'Sonya', age: 17 },
//   { _id: ObjectId('68407189a681185c5750eb6a'), name: 'Ilya', age: 21 }
// ]

// school> db.students.find({name:"Alyona"}) -- ищет документы по заданному критерию (в скобках, может быть несколько, например еще age: 24 и т.д)
// [
//   {
//     _id: ObjectId('68406ef8a681185c5750eb68'),
//     name: 'Alyona',
//     age: 27
//   }
// ]

// school> db.students.find({}, {name:true})  -- вернуть только определенные ключ:значение (тут - имена). В Compass - поле project
// [
//   { _id: ObjectId('68406ef8a681185c5750eb68'), name: 'Alyona' },
//   { _id: ObjectId('68407189a681185c5750eb69'), name: 'Yulya' },
//   { _id: ObjectId('68407189a681185c5750eb6a'), name: 'Ilya' },
//   { _id: ObjectId('68407189a681185c5750eb6b'), name: 'Sonya' },
//   { _id: ObjectId('684072e4a681185c5750eb6c') },
//   { _id: ObjectId('68407f30a681185c5750eb6d'), name: 'Alena' }
// ]

// school> db.students.find({}, {_id:false, age:true})
// [ { age: 27 }, { age: 24 }, { age: 21 }, { age: 17 }, {}, { age: 32 } ]

//school> db.students.find({query}, {projection}) -- query - определенные ключ:значение, projection - определенные ключи. Если не указать ничего - выведет все документы.

// school> db.students.updateOne({name: "Alena"}, {$set:{subName:"Alyona"}}) -- обновляет документ, заменяя или добавляя свойства,

// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 1,
//   upsertedCount: 0
// }
// school> db.students.find({name:"Alena"})
// [
//   {
//     _id: ObjectId('68407f30a681185c5750eb6d'),
//     name: 'Alena',
//     age: 32,
//     gpa: 2.8,
//     fullTime: false,
//     regusterDate: ISODate('2025-06-04T17:15:28.348Z'),
//     gradutionDate: null,
//     courses: [ 'Biology', 'Chemistry' ],
//     address: { street: 'kulakova', city: 'Moscow' },
//     subName: 'Alyona'
//   }
// ]
// можно еще по {_id:ObjectId(""), {$set:{subName:"Alyona"}}} -- по айди и тд. Искать по айди так же, через _id:ObjectId("")
// {_id:ObjectId(""), {un$set:{subName:""}}} -- удалит свойство. (пару ключ:значение)

// school> db.students.updateMany({}, {$set:{fullTime:false}}) -- обновление нескольких. Если поля у некоторых нет - оно будет создано для них
// Если первый параметр пустой ({}), то применяется для всех
// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 2,
//   modifiedCount: 1,
//   upsertedCount: 0
// }

// school> db.students.find()
// [
//   {
//     _id: ObjectId('68407189a681185c5750eb69'),
//     name: 'Yulya',
//     age: 24,
//     fullTime: false
//   },
//   {
//     _id: ObjectId('68407f30a681185c5750eb6d'),
//     name: 'Alena',
//     age: 32,
//     gpa: 2.8,
//     fullTime: false,
//     regusterDate: ISODate('2025-06-04T17:15:28.348Z'),
//     gradutionDate: null,
//     courses: [ 'Biology', 'Chemistry' ],
//     address: { street: 'kulakova', city: 'Moscow' },
//     subName: 'Alyona'
//   }

// school  db.students.updateMany({fullTime:{$exists}:false}}, {$set:{fullTime:true}}) -- если exists - true, то проверяем, что поле fullTime существует, если false то наоборот,
// и меняем значение в $set{}

// school> db.students.deleteOne({name:"Alena"}) -- удалить кого-то одного с такой парой ключ:значение
// school> db.students.deleteMany({fullTime:false}) -- удалить всех с такой парой ключ:значение
// school> db.students.deleteMany({registerDate:{$exists:false}}) -- удалить все документы, у которых не существует такого поля

// school> db.students.find({name:{$ne:"Alena"}}) -- вернуть все документы НЕ с этими именем

// school> db.students.find({age:{$lt:18}}) -- вернуть все документы с возрастом меньше, чем 18
// school> db.students.find({age:{$lte:18}}) -- вернуть все документы с возрастом меньше, чем 18, или равен 18

// school> db.students.find({age:{$gt:18}}) -- вернуть все документы с возрастом больше, чем 18
// school> db.students.find({age:{$gte:18}}) -- вернуть все документы с возрастом больше, чем 18, или равен 18

// school> db.students.find({gpa:{$gte:3, $lte:4}}) -- вернуть все документы, с баллом больше или равно 3 и меньше или равно 4. 3 <= gpa <= 4

// school> db.students.find({name:{$in:["Alena", "Yulya"]}}) -- вернуть все документы, имена которых ЕСТЬ в заданном массиве
// school> db.students.find({name:{$in:["Alena", "Yulya"]}}) -- вернуть все документы, имен которых НЕТ в заданном массиве

// school> db.students.find({$and:[{name:"Alena"}, {age:{$lte:25}}]}) -- вернуть документы, у которых совпадают ВСЕ заданные условия
// school> db.students.find({$or:[{name:"Alena"}, {age:{$lte:25}}]}) -- вернуть документы, у которых совпадает ОДНО ИЗ заданных условий
// school> db.students.find({$nor:[{name:"Alena"}, {age:{$lte:25}}]}) -- вернуть документы, у которых НЕ совпадает ОДНО ИЗ заданных условий

// school> db.students.find({age:{$not:{$gte:30}}}) -- вернуть документы, возраст которых НЕ больше или равен 30 (включая null).
// То есть not вернет все, что не соответствует заданном уусловия, в том числе null.

// Индексы. Позволяют быстрее искать документы, но занимают больше памяти и замедляют CRUD-операции.
// Использовать, когда много поиска, но мало CRUD-операций.
// school> db.students.find({name:"Alena"}).explain("executionStats") -- вернет статистику выполнения метода. find - линейный поиск

// school> db.students.createIndex({name: 1}) -- создать индексы в порядке возрастания
// school> db.students.getIndexes() -- вернуть все индексы
// school> db.students.dropIndex("name_1") -- удалить индекс (значения берется когда возвращаешься индексы там видно)