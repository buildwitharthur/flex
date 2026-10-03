import type { RequestHandler } from 'express'

import { prisma } from '../../lib/prisma/index.js'

export const getCategories: RequestHandler = async (_request, response) => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc',
        },
        include: {
            _count: {
                select: {
                    partners: true,
                },
            },
        },
    })

    return response.status(200).json({
        categories: categories.map(({ _count, ...category }) => ({
            ...category,
            partnersCount: _count.partners,
        })),
    })
}
