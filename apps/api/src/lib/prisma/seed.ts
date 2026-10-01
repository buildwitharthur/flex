import 'dotenv/config'

import bcrypt from 'bcryptjs'

import { UserRole } from '../../generated/prisma/client.js'
import { prisma } from './index.js'

async function seed() {
    const name = process.env.ADMIN_NAME
    const username = process.env.ADMIN_USERNAME
    const password = process.env.ADMIN_PASSWORD

    if (!name) {
        throw new Error('ADMIN_NAME is not defined')
    }

    if (!username) {
        throw new Error('ADMIN_USERNAME is not defined')
    }

    if (!password) {
        throw new Error('ADMIN_PASSWORD is not defined')
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.user.upsert({
        where: {
            username,
        },
        create: {
            name,
            username,
            passwordHash,
            role: UserRole.ADMIN,
            isActive: true,
        },
        update: {
            name,
            passwordHash,
            role: UserRole.ADMIN,
            isActive: true,
        },
    })
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })
