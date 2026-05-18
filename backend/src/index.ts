import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import sqlite3 from 'sqlite3'


const app = new Hono()
const db = new sqlite3.Database('testdatabase.db');

app.get('/', async (c) => {
  db.all('SELECT * FROM tickets', (err, rows) => {
    if (err) {
      console.error(err)
      return c.text('Error fetching tickets')
    }
    console.log(rows)

  })
})

export default app

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
