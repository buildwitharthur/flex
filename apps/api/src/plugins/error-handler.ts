import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (
    _error,
    _request,
    response,
    _next,
) => {
    response.status(500).json({
        message: 'Internal server error',
    })
}
