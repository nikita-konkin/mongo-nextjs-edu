import { MongoClient } from 'mongodb'
// Импорт библиотеки для подключения к БД
const uri = process.env.MONGODB_LOCAL
// Импорт адреса к БД
const options = {}
// Доп. опции для подключения
let client
let clientPromise: Promise < MongoClient >
// Инициализация переменных для доступа к БД
client = new MongoClient(uri, options)
clientPromise = client.connect()
// Подключение к БД
export default clientPromise
// Экспорт функции по умолчанию