import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { RequestHandler } from 'express';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { Uid } from 'types';
import { errorHandler } from './errorHandler';

const jwtSecretKey = process.env.JWT_SECRET_KEY as Secret;

export const verifyPassword = (candidatePassword: string, password: string) => {
  return bcrypt.compare(candidatePassword, password);
};

export const verifyTokenMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers['authorization'];

  try {
    if (!token) throw new Error('No token provided.');

    const { id } = (await verifyToken(token)) as JwtPayload;

    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) throw errorHandler.notFound('User not found');

    req.user = user;
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecretKey);
};

export const generateAccessToken = (
  payload: Uid,
  options: SignOptions = { expiresIn: '5m' }
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
      expiresIn: '7d'
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
