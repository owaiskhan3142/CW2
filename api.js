import express from 'express'
import { db } from './db.js'

const router = express.Router()

router.get('/lesson', async (req, res) => {
  const { search = '' } = req.query

  return res.json(
    (await db
      .collection('lesson')
      .find()
      .toArray())
      .filter(item => {
        const values = [item.subject, item.location, item.price, item.space]
        return values.join(' ').toLowerCase().includes(search.toLowerCase())
      }),
  )
})

router.get('/order', async (_, res) => {
  const order = await db.collection('order').find().toArray()
  return res.json(order)
})

router.post('/order', async (req, res) => {
  const { name, phone, lessons } = req.body

  if (!name || !phone || !lessons || !lessons.length) return res.sendStatus(400)

  await db.collection('order').insertOne({ name, phone, lessons })
  return res.sendStatus(201)
})

router.put('/lesson', async (req, res) => {
  const { lessons } = req.body
  if (!lessons || !lessons.length) {
    return res.sendStatus(400)
  }

  await Promise.all(lessons.map(async ({ subject, space }) => {
    await db
      .collection('lesson')
      .updateOne(
        { subject },
        { $inc: { space: -space } },
      )
  }))

  return res.sendStatus(200)
})

export default router
