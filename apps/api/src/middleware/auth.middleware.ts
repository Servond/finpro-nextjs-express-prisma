import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../types/express';
import {
  ACCESS_TOKEN_SECRET,
  EMAIL_VERIFICATION_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../config';

export class AuthMiddleware {
  // for verifying if the request coming from authenticated user whatever the role
  // token is passed from header
  public authenticateJWT = (tokenType: 'access' | 'refresh') => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('Token is missing');

        let secret;
        if (tokenType === 'access') {
          secret = ACCESS_TOKEN_SECRET;
        } else if (tokenType === 'refresh') {
          secret = REFRESH_TOKEN_SECRET;
        } else {
          throw new Error('Invalid token type');
        }

        const decoded = verify(token, String(secret)) as User;
        req.user = decoded;

        next();
      } catch (error) {
        next(error);
      }
    };
  };
  public verifyAccessToken = this.authenticateJWT('access');
  //  async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   try {
  //     const accessToken = req.header('Authorization')?.replace('Bearer ', '');

  //     if (!accessToken) throw new Error('Token is missing');

  //     const isToken = verify(accessToken, String(ACCESS_TOKEN_SECRET));

  //     if (!isToken) throw new Error('Unauthorized');

  //     req.user = isToken as User;

  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public verifyRefreshToken = this.authenticateJWT('refresh');

  //async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   try {
  //     const refreshToken = req.header('Authorization')?.replace('Bearer ', '');

  //     if (!refreshToken) throw new Error('Token is missing');

  //     const isToken = verify(refreshToken, String(REFRESH_TOKEN_SECRET));

  //     if (!isToken) throw new Error('Unauthorized');

  //     req.user = isToken as User;

  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // for verifying token from verify-email
  // token is passed from query
  // public verifyEmailToken = this.authenticateJWT('refresh');
  // async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   try {
  //     const { token } = req.query as { token: string };

  //     if (!token) throw new Error('Token is missing');

  //     const isToken = verify(token, String(EMAIL_VERIFICATION_SECRET));

  //     if (!isToken) throw new Error('Unauthorized');

  //     req.user = isToken as User;

  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // for user authorization based on role name
  // IMPORTANT: MUST BE USED AFTER `verifyToken` MIDDLEWARE

  // ======== HOW TO USE ========
  // on <something>.router.ts:
  // this.router.<METHOD>(
  //       '/<ENDPOINT>',
  //       this.guard.verifyToken,
  //       this.guard.verifyRole('<ROLE_NAME>'),
  //       this.<nextController>.<nextAction>,
  //     );
  public verifyEmailToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { token } = req.query as { token: string };

      if (!token) throw new Error('Token is missing');

      const decoded = verify(token, String(EMAIL_VERIFICATION_SECRET)) as User;
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };

  public verifyRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = req.user as User;

        if (!user) throw new Error('User not found');

        if (user.role !== requiredRole) {
          throw new Error('Forbidden: Insufficient role');
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };
}
