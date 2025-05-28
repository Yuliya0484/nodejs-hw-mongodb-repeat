import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactControler,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.get('/', checkRoles(ROLES.FRIEND), ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkRoles(ROLES.FRIEND, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  checkRoles(ROLES.FRIEND),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  checkRoles(ROLES.FRIEND),
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.FRIEND, ROLES.PARENT),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactControler),
);

export default router;
