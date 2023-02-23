import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb://owais:owais@ac-fh7oait-shard-00-00.k4xntsy.mongodb.net:27017,ac-fh7oait-shard-00-01.k4xntsy.mongodb.net:27017,ac-fh7oait-shard-00-02.k4xntsy.mongodb.net:27017/?ssl=true&replicaSet=atlas-11gawn-shard-0&authSource=admin&retryWrites=true&w=majority'

export const client = new MongoClient(uri, {
  useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1,
})

export const db = client.db(process.env.NODE_ENV || 'dev')
