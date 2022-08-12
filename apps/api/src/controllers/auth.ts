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

export const register: RequestHandler = async (req, res, next) => {
  const { password, email, username }: User = req.body;
  //access: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhMmQ0NDhlLWNjNzEtNDViMC1iODdiLTdiZDY4NzNiY2ZhNSIsImlhdCI6MTY2MDMwNTUxMCwiZXhwIjoxNjYwMzA1ODEwfQ.QzUtO_Ytuh5XWSnbLdYqGlI1z3d5ZmlIpGWsbB5OWOk
  //refresh: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNGNkZTMxLTA5ODctNDNmOS05OGI3LTJmMzRjZTFkZjJlMSIsImlhdCI6MTY2MDMwNTUxMCwiZXhwIjoxNjYwOTEwMzEwfQ.l_vVP4fdDXGijUk5XqWw2MeoJ-SGpGuQ3GMvHa7eZrw
  try {
    if (!password) throw new Error();

    const passwordHash = generateHashedPassword(password);

    const user = await prisma.user.create({
      data: {
        password: passwordHash,
        email: email,
        socketId: null,
        username: username
      }
    });

    const { accessToken, refreshToken } = generateTokens(user.id);

    const userDto: UserDto = user;

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
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw errorHandler.notFound('User not found');
    }

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) throw new Error('');

    const { accessToken, refreshToken } = generateTokens(user.id);

    const userDto: UserDto = await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken
      }
    });

    delete userDto.password;

    res.status(200).json({
      ...userDto,
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
