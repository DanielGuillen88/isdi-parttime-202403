import express from 'express'
import 'dotenv/config'
import { PORT } from './config.js'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

const api = express()
// Middleware parse JSON
api.use(express.json({ strict: true, type: 'application/json' }))

api.use(cors())

// traemos todas las rutas
api.use('/users/', userRoutes)

api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
