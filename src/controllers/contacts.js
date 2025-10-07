import createHttpError from 'http-errors';
import {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getContactsController(req, res, next) {
  try {
    const data = await getAllContacts();

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
  try {
    const contact = await getOneContact(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(404).json({ status: 404, message: 'Contact not found' });
    console.error(err);
  }
}

export async function createContactController(req, res, next) {
  try {
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
  try {
    const data = await updateContact(req.params.contactId, req.body);

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
  try {
    const contact = await deleteContact(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
