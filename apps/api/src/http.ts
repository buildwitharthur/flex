import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import { cookies } from './lib/cookies/index.js'
import { errorHandler } from './plugins/error-handler.js'
import { rateLimitPlugin } from './plugins/rate-limit.js'

import { loginRouter } from './routes/login.js'
import { logoutRouter } from './routes/logout.js'
import { profileRouter } from './routes/profile.js'
import { adminUsersRouter } from './routes/admin/users/index.js'
import { categoryRouter } from './routes/category/index.js'
import { partnerRouter } from './routes/partner/index.js'
import { contactRouter } from './routes/contact/index.js'

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
app.use(errorHandler)

app.use(loginRouter)
app.use(logoutRouter)
app.use(profileRouter)

app.use('/categories', categoryRouter)
app.use('/partners', partnerRouter)
app.use('/contacts', contactRouter)
app.use('/admin/users', adminUsersRouter)

app.get('/health', (_request, response) => {
    response.json({ status: 'ok' })
})



app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
