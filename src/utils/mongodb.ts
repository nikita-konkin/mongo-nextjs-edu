import {MongoClient} from 'mongodb'

const uri = process.env.MONGODB_LOCAL

const options = {}

let client
let clientPromise: Promise<MongoClient>

// client = new MongoClient(uri, options)
// global._mongoClientPromise = client.connect()
client = new MongoClient(uri, options)
clientPromise = client.connect()

export default clientPromise