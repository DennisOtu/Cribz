import express from 'express'
import cors from 'cors'
import listings from './api/listings.route.js'
import auth from './api/auth.route.js'
import cookieParser from 'cookie-parser'

const app = express()

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())

// Routing
app.use('/api/v1/listings', listings)
app.use('/api/v1/auth', auth)
app.use("*", (req, res) => res.status(404).json({ error: "page not found" }))

export default app

