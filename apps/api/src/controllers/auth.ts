import { RequestHandler } from 'express';
import { authService } from '../services/auth';

export const register: RequestHandler = async (req, res, next) => {
  try {
    await authService.register(req.body);

    const { accessToken, refreshToken } = await authService.login(req.body);

    authService.setCookie(res, refreshToken);

    res.status(201).json({
      accessToken
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.login(
      req.body
    );

    authService.setCookie(res, refreshToken);

    res.status(200).json({
      ...user,
      accessToken
    });
  } catch (e) {
    next(e);
  }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { accessToken, newRefreshToken } = await authService.refreshToken(
      req.cookies.refresh_token
    );

    authService.setCookie(res, newRefreshToken);

    return res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
