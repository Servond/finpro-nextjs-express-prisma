import { Request, Response, NextFunction } from 'express';

export const ErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(500).send(error.message);
  } catch (error) {
    next(error);
  }
};
