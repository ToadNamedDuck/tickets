import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import sqlite3 from 'sqlite3'


const app = new Hono()
app.use('*', cors({ origin: '*' }))
const db = new sqlite3.Database('testdatabase.db');


//Gets all tickets
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

//Get a single ticket by ID
app.get('/tickets/:id', async (c) => {
  try {
    const { id } = c.req.param()
    const row = await new Promise<any>((resolve, reject) => {
      db.get('SELECT * FROM tickets WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err)
        } else if (!row) {
          reject(new Error('Ticket not found'))
        } else {
          resolve(row)
        }
      })
    })
    return c.json(row)
  }
  catch (err) {
      console.error(err)
      return c.text('Error fetching ticket', 500)
  }
})


//Create new ticket
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

//Update a ticket's open/closed Status
app.patch('/updateStatus/:id', async (c) => {
  try {
    const { id } = c.req.param()

    await new Promise<void>((resolve, reject) => {
      db.run(
        'UPDATE tickets SET isOpen = NOT isOpen, dateEdited = ? WHERE id = ?',
        [new Date().toISOString(), id],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })

    return c.text(`Ticket status updated successfully.`)
  }
  catch (err) {
      console.error(err)
      return c.text('Error updating ticket', 500)
  }
})

//Edit ticket title or description
app.patch('/editTicket/:ticketId', async (c) => {
  try {
    const { ticketId } = c.req.param()
    const body = await c.req.json()
    const { id, title, description, isOpen } = body || {}

    //There must be a title and a description
    if(id !== parseInt(ticketId)) {
      return c.text('Ticket ID in URL does not match ticket ID in body', 400)
    }
    if (!title || !description || title.trim() === '' || description.trim() === '') {
      return c.text('Ticket must contain both a title and a description', 400)
    }
    if (!isOpen){
      return c.text('Cannot edit a closed ticket', 400)
    }
    const values: string[] = [title, description, new Date().toISOString(), ticketId]


    await new Promise<void>((resolve, reject) => {
      db.run(
        `UPDATE tickets SET title = ?, description = ?, dateEdited = ? WHERE id = ?`,
        [...values],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })

    return c.text(`Ticket updated successfully.`)
  }
  catch (err) {
      console.error(err)
      return c.text('Error updating ticket', 500)
  }
})

export default app

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
