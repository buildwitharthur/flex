import type { RequestHandler } from 'express'

import { prisma } from '../../../lib/prisma/index.js'
import { userSelect } from './user-select.js'

export const getUsers: RequestHandler = async (_request, response) => {
    const users = await prisma.user.findMany({
        select: userSelect,
        orderBy: { createdAt: 'desc' },
    })

    return response.status(200).json({ users })
}
