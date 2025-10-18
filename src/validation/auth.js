import Joi from 'joi';

const nameField = Joi.string().min(3).max(20).messages({
  'string.base': 'Name should be a string',
  'string.min': 'Name should have at least {#limit} characters',
  'string.max': 'Name should have at most {#limit} characters',
});

const emailField = Joi.string().email().messages({
  'string.email': 'Must be a valid email',
});

const passwordField = Joi.string().messages({
  'string.base': 'Password should be a string',
});

const tokenField = Joi.string();

export const registerUserSchema = Joi.object({
  name: nameField.required().messages({
    'any.required': 'Name is required',
  }),
  email: emailField.required().messages({
    'any.required': 'Email is required',
  }),
  password: passwordField.required().messages({
    'any.required': 'Password is required',
  }),
});

export const loginUserSchema = Joi.object({
  email: emailField.required().messages({
    'any.required': 'Email is required',
  }),
  password: passwordField.required().messages({
    'any.required': 'Password is required',
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: emailField.required().messages({
    'any.required': 'Email is required',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: passwordField.required().messages({
    'any.required': 'Password is required',
  }),
  token: tokenField.required().messages({
    'any.required': 'Token is required',
  }),
});
