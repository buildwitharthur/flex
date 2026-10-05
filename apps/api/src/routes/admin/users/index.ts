import { Router } from 'express'

import { UserRole } from '../../../generated/prisma/client.js'
import { auth } from '../../../plugins/auth.js'
import { permission } from '../../../plugins/permission.js'
import { createUser } from './create-user.js'
import { deleteUser } from './delete-user.js'
import { getUsers } from './get-users.js'
import { updateUser } from './update-user.js'

const adminUsersRouter = Router()

adminUsersRouter.use(auth)
adminUsersRouter.use(permission([UserRole.ADMIN]))
adminUsersRouter.get('/', getUsers)
adminUsersRouter.post('/', createUser)
adminUsersRouter.patch('/:id', updateUser)
adminUsersRouter.delete('/:id', deleteUser)

export { adminUsersRouter }
