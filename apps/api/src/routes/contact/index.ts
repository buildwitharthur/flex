import { Router } from 'express'

import { auth } from '../../plugins/auth.js'
import { createPublicContact } from './create-public-contact.js'
import { exportContacts } from './export-contacts.js'
import { getContacts } from './get-contacts.js'
import { updateContact } from './update-contact.js'

const contactRouter = Router()

contactRouter.post('/public', createPublicContact)
contactRouter.use(auth)
contactRouter.get('/', getContacts)
contactRouter.get('/export', exportContacts)
contactRouter.patch('/:id', updateContact)

export { contactRouter }
