import { rateLimit } from 'express-rate-limit'

export const rateLimitPlugin = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})
