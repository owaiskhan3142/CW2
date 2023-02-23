/* eslint-disable no-console */
import process from 'process'
import { client } from '../db.js'

const lessons = [
  { subject: 'Math', location: 'London', price: 100, space: 5 },
  { subject: 'Hindi', location: 'Oxford', price: 100, space: 5 },
  { subject: 'English', location: 'London', price: 80, space: 5 },
  { subject: 'Networking', location: 'Oxford', price: 80, space: 5 },
  { subject: 'Science', location: 'Coventry', price: 90, space: 5 },
  { subject: 'AI', location: 'Lancaster', price: 90, space: 5 },
  { subject: 'Music', location: 'Coventry', price: 50, space: 5 },
  { subject: 'Computer', location: 'Yorkshire', price: 50, space: 5 },
  { subject: 'History', location: 'Yorkshire', price: 60, space: 5 },
  { subject: 'Geography', location: 'London', price: 60, space: 5 },
]

await client.connect()

const db = client.db('dev')

console.log('> dropping collections')
try {
  await db.dropCollection('lesson')
  console.log('>> dropped collection `lesson`')
  await db.dropCollection('order')
  console.log('>> dropped collection `order`')
}
catch { /* empty */ }

console.log('> populating collection `lesson`')
await db
  .collection('lesson')
  .insertMany(lessons)

console.log('> creating indexes')
await db
  .collection('lesson')
  .createIndex({ subject: 'text', location: 'text', price: 'text', space: 'text' })

console.log('> done')
process.exit()
