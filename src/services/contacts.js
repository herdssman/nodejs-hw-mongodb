import { Contact } from '../models/contacts.js';

export const getAllContacts = () => {
  return Contact.find();
};

export const getOneContact = (contactId) => {
  return Contact.findById(contactId);
};

export const createContact = (payload) => {
  return Contact.create(payload);
};

export const updateContact = (contactId, payload) => {
  return Contact.findByIdAndUpdate(contactId, payload, { new: true });
};

export const deleteContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
