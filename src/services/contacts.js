import { Contact } from '../models/contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;

  const query = Contact.find({ userId });

  if (filter.type) query.where('contactType').eq(filter.type);

  if (filter.isFavourite !== undefined)
    query.where('isFavourite').eq(filter.isFavourite);

  const [count, contacts] = await Promise.all([
    Contact.find().merge(query).countDocuments(),
    query
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(count, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getOneContact = (contactId, userId) => {
  return Contact.findOne({ _id: contactId, userId });
};

export const createContact = async (payload) => {
  const email = await Contact.findOne({ email: payload.email });

  if (email) throw createHttpError(409, 'Email in use');
  return Contact.create(payload);
};

export const updateContact = (contactId, userId, payload) => {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
  });
};

export const deleteContact = (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};
