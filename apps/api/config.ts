import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
});

const isProd = process.env.NODE_ENV === 'production';

export default {
  PORT: parseInt(process.env.PORT as string) || 8888,
  FRONT_BASE_URL: process.env.FRONT_BASE_URL,

  COOKIE: {
    PATH: '/',
    SECURE: isProd,
    SAMESITE: isProd ? ('none' as const) : true,
    MAXAGE: 604800000,
    HTTPONLY: true
  },

  JWT: {
    SECRET: process.env.JWT_SECRET_KEY,
    EXPIRE_IN: '5m'
  },

  REFRESH_TOKEN: {
    SECRET: process.env.JWT_SECRET_KEY,
    EXPIRE_IN: '7d'
  }
};
