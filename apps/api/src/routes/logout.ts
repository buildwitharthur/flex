import { Router } from 'express'

import { authCookieOptions, AUTH_COOKIE_NAME } from '../lib/cookies/index.js'

export const logoutRouter = Router()

logoutRouter.post('/logout', (_request, response) => {
    const { maxAge: _maxAge, expires: _expires, ...clearOptions } =
        authCookieOptions

    response.clearCookie(AUTH_COOKIE_NAME, clearOptions)

    return response.status(204).send()
})
