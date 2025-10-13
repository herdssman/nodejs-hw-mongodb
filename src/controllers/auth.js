import { THIRTY_DAYS } from '../constants/index.js';
import {
  registerUser,
  loginUser,
  refreshSession,
  logoutUser,
} from '../services/auth.js';

export async function registerUserController(req, res, next) {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

const setUpSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export async function loginUserController(req, res, next) {
  try {
    const session = await loginUser(req.body);

    setUpSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: { accessToken: session.accessToken },
    });
  } catch (err) {
    next(err);
  }
}

export async function refreshSessionController(req, res, next) {
  try {
    const session = await refreshSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setUpSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: { accessToken: session.accessToken },
    });
  } catch (err) {
    next(err);
  }
}

export async function logoutUserController(req, res, next) {
  try {
    if (req.cookies.sessionId) await logoutUser(req.cookies.sessionId);

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
