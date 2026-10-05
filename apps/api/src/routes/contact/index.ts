import { Router } from 'express'

import { auth } from '../../plugins/auth.js'
import { getContacts } from './get-contacts.js'
import { updateContact } from './update-contact.js'

const contactRouter = Router()

contactRouter.use(auth)
contactRouter.get('/', getContacts)
contactRouter.patch('/:id', updateContact)

export { contactRouter }
