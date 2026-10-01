import 'dotenv/config'

import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { cookies } from './lib/cookies.js'
import { errorHandler } from './plugins/error-handler.js'
import { rateLimitPlugin } from './plugins/rate-limit.js'

const app = express()
const port = Number(process.env.PORT) || 3333

app.use(
    cors({
        origin: process.env.WEB_URL ?? 'http://localhost:5173',
        credentials: true,
    }),
)
app.use(express.json())
app.use(cookies)
app.use(rateLimitPlugin)

app.get('/health', (_request, response) => {
    response.json({ status: 'ok' })
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
