import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { errorHandler } from './plugins/error-handler.js'
import { rateLimitPlugin } from './plugins/rate-limit.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 3333

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
    }),
)
app.use(express.json())
app.use(rateLimitPlugin)

app.get('/health', (_request, response) => {
    response.json({ status: 'ok' })
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
