import cookieParser from 'cookie-parser'
import type { CookieOptions } from 'express'

export const cookies = cookieParser()

export const COOKIES_NAME = 'flex.session'

export const cookiesOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24, // 24hrs
}
