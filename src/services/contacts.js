import { Contact } from '../models/contacts.js';

export function getAllContacts() {
  return Contact.find();
}
export function getOneContact(contactId) {
  return Contact.findById(contactId);
}
