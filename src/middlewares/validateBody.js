import createHttpError from 'http-errors';

export default function validateBody(schema) {
  return async function (req, res, next) {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      const error = createHttpError(400, 'Bad request', {
        errors: err.details,
      });
      next(error);
    }
  };
}
