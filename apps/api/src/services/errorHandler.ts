import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ status: err.status, message: err.message } || 'internal error');

  next();
};

type ErrorHandler = {
  message: string;
  status: number;
};

export const errorHandler = {
  notFound: (message = 'Not Found'): ErrorHandler => {
    return { message, status: 404 };
  },
  unAuthorized: (message = 'unAuthorized'): ErrorHandler => {
    return { message, status: 401 };
  }
};
