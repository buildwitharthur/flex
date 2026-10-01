import cookieParser from 'cookie-parser'
import type { CookieOptions } from 'express'

export const cookies = cookieParser()

export const AUTH_COOKIE_NAME = 'flex.session'

export const authCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
}
