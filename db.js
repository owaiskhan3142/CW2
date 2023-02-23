import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb://gilani:gilani@ac-mgyavid-shard-00-00.ghpu8dj.mongodb.net:27017,ac-mgyavid-shard-00-01.ghpu8dj.mongodb.net:27017,ac-mgyavid-shard-00-02.ghpu8dj.mongodb.net:27017/?ssl=true&replicaSet=atlas-uw6n64-shard-0&authSource=admin&retryWrites=true&w=majority'


export const client = new MongoClient(uri, {
  useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1,
})

export const db = client.db(process.env.NODE_ENV || 'dev')
