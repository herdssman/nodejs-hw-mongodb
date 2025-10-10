import { Contact } from '../models/contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const query = Contact.find();

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
