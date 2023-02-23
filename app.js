import express from 'express'
import apiRouter from './api.js'
import { client } from './db.js'

const app = express()
const port = 3000

app.use(express.json())

// Logger Middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`)
  })
  next()
})

// Frontend path
app.use(express.static('vue.js'))

// API routes
app.use('/api', apiRouter)

client.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`)
    })
  })
