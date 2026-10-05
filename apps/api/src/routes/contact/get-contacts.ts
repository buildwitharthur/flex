import type { RequestHandler } from 'express'

import { prisma } from '../../lib/prisma/index.js'

export const getContacts: RequestHandler = async (_request, response) => {
    const contacts = await prisma.contact.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    return response.status(200).json({ contacts })
}
