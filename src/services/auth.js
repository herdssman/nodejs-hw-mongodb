import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { User } from '../models/users.js';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';

export const registerUser = async (payload) => {
  const hashed = await bcrypt.hash(payload.password, 10);
  const email = await User.findOne({ email: payload.email });

  if (email) throw createHttpError(409, 'Email in use');

  return await User.create({ ...payload, password: hashed });
};

const session = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

const newSession = session();

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'Incorrect email or password');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Incorrect email or password');

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...newSession,
  });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  if (new Date() > new Date(session.refreshTokenValidUntil))
    throw createHttpError(401, 'Session token expired');

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
