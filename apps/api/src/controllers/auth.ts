import { User } from '@prisma/client';
import { RequestHandler } from 'express';

export const login: RequestHandler = (req, res, next) => {
  const user: User = req.body;
  try {
    console.log(user);
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const verifyToken: RequestHandler = (req, res, next) => {
  const user: User = req.body;
  try {
    console.log(user);
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};
