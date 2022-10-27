import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { RequestHandler, Response } from 'express';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { LoginUserDto, RegisterUserDto } from 'shared';
import { Uid } from 'types';
import config from '../../config';
import { errorHandler } from './errorHandler';
import prisma from '../prisma/prisma';
import {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  updateUserById
} from './user';

const jwtSecretKey = config.JWT.SECRET as Secret;

export const verifyPassword = (candidatePassword: string, password: string) => {
  return bcrypt.compare(candidatePassword, password);
};

export const verifyTokenMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers['authorization'];

  try {
    if (!token) throw new Error('No token provided.');

    const plainToken = token.replace('Bearer ', '');

    const decoded = await verifyToken(plainToken);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) throw errorHandler.notFound('User not found');

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecretKey) as JwtPayload;
};

export const generateAccessToken = (
  payload: Uid,
  options: SignOptions = { expiresIn: config.JWT.EXPIRE_IN }
) => {
  return jwt.sign({ id: payload }, jwtSecretKey, options);
};

export const generateRefreshToken = () => {
  return jwt.sign(
    {
      id: randomUUID()
    },
    jwtSecretKey,
    {
      expiresIn: config.REFRESH_TOKEN.EXPIRE_IN
    }
  );
};

export const generateHashedPassword = (password: string) => {
  return bcrypt.hashSync(password, 8);
};

export const generateTokens = (payload: string) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken();

  return {
    accessToken,
    refreshToken
  };
};

export const authService = {
  login: async ({ email, password }: LoginUserDto) => {
    const user = await findUserByEmail(email);
    if (!user) throw errorHandler.notFound('User not found');

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) throw errorHandler.unAuthorized();

    const { accessToken, refreshToken } = generateTokens(user.id);

    console.log();

    const userUpdated = await updateUserById({
      id: user.id,
      refreshToken
    });

    return { accessToken, refreshToken, user: userUpdated };
  },

  register: async ({ password, email, username }: RegisterUserDto) => {
    if (!password || !email || !username) throw new Error();

    const passwordHash = generateHashedPassword(password);

    const userCreated = await createUser({
      password: passwordHash,
      email: email,
      username: username
    } as User);

    const { accessToken, refreshToken } = generateTokens(userCreated.id);

    await updateUserById({
      id: userCreated.id,
      refreshToken
    });

    return accessToken;
  },

  refreshToken: async (refreshToken: string) => {
    if (!refreshToken) throw new Error('Missing refresh token.');

    await verifyToken(refreshToken);

    const user = await findUserByRefreshToken(refreshToken);
    if (!user) throw errorHandler.unAuthorized();

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user.id
    );

    await updateUserById({ id: user.id, refreshToken: newRefreshToken });

    return { accessToken, newRefreshToken };
  },

  setCookie: (res: Response, value: string) => {
    res.cookie('refresh_token', value, {
      path: config.COOKIE.PATH,
      secure: config.COOKIE.SECURE,
      sameSite: config.COOKIE.SAMESITE,
      maxAge: config.COOKIE.MAXAGE,
      httpOnly: config.COOKIE.HTTPONLY
    });
  }
};
