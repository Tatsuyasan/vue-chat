import { User } from '@prisma/client';
import prisma from '../prisma/prisma';
import { RequestHandler } from 'express';
import {
  generateHashedPassword,
  generateTokens,
  verifyPassword,
  verifyToken
} from '../services/auth';
import { UserDto } from 'types';
import { errorHandler } from '../services/errorHandler';
import { createUser, findUserByEmail, updateUserById } from '../services/user';

export const register: RequestHandler = async (req, res, next) => {
  const { password, email, username } = req.body;

  try {
    if (!password || !email || !username) throw new Error();

    const passwordHash = generateHashedPassword(password);

    const userCreated = await createUser({
      password: passwordHash,
      email: email,
      username: username
    } as User);

    const { accessToken, refreshToken } = generateTokens(userCreated.id);

    const userDto: UserDto = userCreated;

    delete userDto.password;

    res.status(201).json({
      ...userDto,
      accessToken,
      refreshToken
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next(e);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password }: User = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      throw errorHandler.notFound('User not found');
    }

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) throw new Error('');

    const { accessToken, refreshToken } = generateTokens(user.id);

    const userUpdated: UserDto = await updateUserById({
      id: user.id,
      refreshToken
    });

    delete userUpdated.password;

    res.status(200).json({
      ...userUpdated,
      accessToken,
      refreshToken
    });
  } catch (e) {
    next(e);
  }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }

    await verifyToken(refreshToken);

    const user = await prisma.user.findUnique({
      where: { refreshToken: refreshToken }
    });

    console.log(user);

    if (!user) {
      throw errorHandler.unAuthorized();
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user.id
    );

    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
        refreshToken: newRefreshToken
      }
    });

    return res.status(200).json({ accessToken, newRefreshToken });
  } catch (err) {
    next(err);
  }
};
