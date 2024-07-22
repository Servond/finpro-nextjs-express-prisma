import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '@/types/express';
import { HttpException } from '@/exceptions/http.exception';

export class AuthMiddleware {
  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new HttpException(500, 'Missing Token');

      const isTokenValid = verify(token, String(process.env.API_KEY));
      if (!isTokenValid) throw new HttpException(500, 'Unauthorized');

      req.user = isTokenValid as User;

      next();
    } catch (error) {
      next(error);
    }
  };
}
