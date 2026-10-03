import type { RequestHandler } from 'express'

import { prisma } from '../../lib/prisma/index.js'

export const getCategories: RequestHandler = async (_request, response) => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc',
        },
    })

    return response.status(200).json({ categories })
}
