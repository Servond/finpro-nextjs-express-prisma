import { Request, Response, NextFunction } from 'express';
import userAction from '@/actions/user.action';
import { User } from '@/types/express';

export class UserController {
  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userAction.getUsers();

      res.status(200).json({
        message: 'Get users success',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.user as User;

      const user = await userAction.findUserByUsername(username);

      res.status(200).json({
        message: 'Get user success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
