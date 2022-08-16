import { RequestHandler } from 'express';
import { authService } from '../services/auth';

export const register: RequestHandler = async (req, res, next) => {
  try {
    const accessToken = await authService.register(req.body);

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
    const { accessToken, refreshToken } = await authService.login(req.body);

    authService.setCookie(res, refreshToken);

    res.status(200).json({
      accessToken
    });
  } catch (e) {
    next(e);
  }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { accessToken, newRefreshToken } = await authService.refreshToken(
      req.body
    );

    return res.status(200).json({ accessToken, newRefreshToken });
  } catch (err) {
    next(err);
  }
};
