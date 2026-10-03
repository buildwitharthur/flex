import { Router } from 'express'

import { auth } from '../../plugins/auth.js'
import { createPartner } from './create-partner.js'
import { deletePartner } from './delete-partner.js'
import { getPartners } from './get-partners.js'
import { updatePartner } from './update-partner.js'

const partnerRouter = Router()

partnerRouter.use(auth)
partnerRouter.get('/', getPartners)
partnerRouter.post('/', createPartner)
partnerRouter.patch('/:id', updatePartner)
partnerRouter.delete('/:id', deletePartner)

export { partnerRouter }
