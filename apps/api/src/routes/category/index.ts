import { Router } from 'express'

import { auth } from '../../plugins/auth.js'
import { createCategory } from './create-category.js'
import { deleteCategory } from './delete-category.js'
import { getCategories } from './get-categories.js'
import { updateCategory } from './update-category.js'

const categoryRouter = Router()

categoryRouter.use(auth)
categoryRouter.get('/', getCategories)
categoryRouter.post('/', createCategory)
categoryRouter.patch('/:id', updateCategory)
categoryRouter.delete('/:id', deleteCategory)

export { categoryRouter }
