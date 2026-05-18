import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import sqlite3 from 'sqlite3'


const app = new Hono()
app.use('*', cors({ origin: '*' }))
const db = new sqlite3.Database('testdatabase.db');

app.get('/tickets', async (c) => {
  try {
    const rows = await new Promise<any[]>((resolve, reject) => {
      db.all('SELECT * FROM tickets', (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
    return c.json(rows)
  }
  catch (err) {
      console.error(err)
      return c.text('Error fetching tickets', 500)
  }
})

app.post('/newTicket', async (c) => {
  try {
    const body = await c.req.json()
    const { title, username, description } = body || {}
    if (!title || !username || !description) {
      return c.text('Missing required fields: title, username, description', 400)
    }

    const lastID = await new Promise<number>((resolve, reject) => {
      db.run(
        'INSERT INTO tickets (title, username, description, isOpen, dateOpened) VALUES (?, ?, ?, ?, ?)',
        [title, username, description, 1, new Date().toISOString()],
        function (err) {
          if (err) {
            reject(err)
          } else {
            // `this.lastID` is provided by sqlite3 when using a function callback
            resolve((this as any).lastID)
          }
        }
      )
    })

    const created = {
      id: lastID,
      title,
      username,
      description,
      isOpen: 1,
      dateOpened: new Date().toISOString(),
    }

    return c.json(created, 201)
  }
  catch (err) {
      console.error(err)
      return c.text('Error creating ticket', 500)
  }
})

export default app

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
