import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/users.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader)
    throw createHttpError(401, 'Please provide Authorization header');

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) throw createHttpError(401, 'Session not found');

  if (new Date() > new Date(session.accessTokenValidUntil))
    throw createHttpError(401, 'Access token expired');

  const user = await User.findById(session.userId);

  if (!user) throw createHttpError(401, 'User not found');

  req.user = user;

  next();
};
