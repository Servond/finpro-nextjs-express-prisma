import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/interfaces/user.interface';
import { AuthAction } from '@/actions/auth.action';
import { User } from '@/types/express';

export class AuthController {
  autAction = new AuthAction();

  registerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        username,
        email,
        password,
        first_name,
        last_name,
        referral_code,
        own_referral_code,
        point_balance,
        role_id,
      }: IUser = req.body;

      const user = await this.autAction.registerAction({
        username,
        email,
        password,
        first_name,
        last_name,
        referral_code,
        own_referral_code,
        point_balance,
        role_id,
      });

      return res.status(201).json({
        message: 'Create user success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      const result = await this.autAction.loginAction(username, password); // Get token from loginAction

      if (!result) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      res.status(200).json({
        message: 'Log in success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  refreshTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { username } = req.user as User;

      const result = await this.autAction.refreshTokenAction(username);

      res.status(200).json({
        message: 'Refresh token success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
