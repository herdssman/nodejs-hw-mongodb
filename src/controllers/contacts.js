import { getAllContacts, getOneContact } from '../services/contacts.js';

export async function getContacts(req, res, next) {
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

export async function getContactsById(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await getOneContact(contactId);

    if (!contact) {
      return res
        .status(404)
        .json({ status: 404, message: 'Contact not found' });
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
