import express from 'express'
import cors from 'cors'
import listings from './api/listings.route.js'
import auth from './api/auth.route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/listings', listings)
app.use('/api/v1/auth', auth)
app.use("*", (req, res) => res.status(404).json({ error: "page not found" }))

export default app

