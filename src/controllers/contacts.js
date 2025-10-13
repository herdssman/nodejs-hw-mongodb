import createHttpError from 'http-errors';
import {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContactsController(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  try {
    const data = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId,
    });

    if (data.data.length === 0) throw createHttpError(404, 'No contacts found');

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getContactsByIdController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const contact = await getOneContact(contactId, userId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
}

export async function createContactController(req, res, next) {
  try {
    req.body.userId = req.user._id;
    const data = await createContact(req.body);

    res.json({
      status: 201,
      message: 'Successfully created a contact!',
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateContactController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const data = await updateContact(contactId, userId, req.body);

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteContactController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const contact = await deleteContact(contactId, userId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
