import express from 'express';
import { getContacts, getContactsById } from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactsById);

export default router;
