import Joi from 'joi';

const nameField = Joi.string().min(3).max(20).messages({
  'string.base': 'Name should be a string',
  'string.min': 'Name should have at least {#limit} characters',
  'string.max': 'Name should have at most {#limit} characters',
});

const phoneNumberField = Joi.string()
  .pattern(/^\+[1-9]\d{1,14}$/)
  .min(3)
  .max(20)
  .messages({
    'string.pattern.base':
      'Phone number must be in international format (e.g. +123456789)',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
  });

const emailField = Joi.string().email().min(3).max(50).messages({
  'string.email': 'Must be a valid email',
  'string.min': 'Email should have at least {#limit} characters',
  'string.max': 'Email should have at most {#limit} characters',
});

const isFavouriteField = Joi.boolean();

const contactTypeField = Joi.string()
  .valid('work', 'home', 'personal')
  .messages({
    'string.base': 'Contact type must be a string',
    'any.only': 'Contact type must be one of: work, home, personal',
  });

export const createContactSchema = Joi.object({
  name: nameField.required().messages({
    'any.required': 'Name is required',
  }),
  phoneNumber: phoneNumberField.required().messages({
    'any.required': 'Phone number is required',
  }),
  email: emailField,
  isFavourite: isFavouriteField,
  contactType: contactTypeField.required().messages({
    'any.required': 'Contact type is required',
  }),
});

export const updateContactSchema = Joi.object({
  name: nameField,
  phoneNumber: phoneNumberField,
  email: emailField,
  isFavourite: isFavouriteField,
  contactType: contactTypeField,
});
