import { Router } from 'express'

import { auth } from '../plugins/auth.js'

export const profileRouter = Router()

profileRouter.get('/profile', auth, (request, response) => {
    return response.status(200).json({
        user: request.auth,
    })
})
