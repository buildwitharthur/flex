import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import { cookies } from './lib/cookies/index.js'
import { errorHandler } from './plugins/error-handler.js'
import { rateLimitPlugin } from './plugins/rate-limit.js'

import { loginRouter } from './routes/login.js'
import { profileRouter } from './routes/profile.js'

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

app.use(loginRouter)
app.use('/profile', profileRouter)

app.get('/health', (_request, response) => {
    response.json({ status: 'ok' })
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
