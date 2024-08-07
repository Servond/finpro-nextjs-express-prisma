import { NextFunction, Request, Response } from 'express';
import usersAction from '@/action/user.action';
import { User } from '@/types/express';

export class UsersController {
  public profileController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.user as User;

      const data = await usersAction.findSelfById(id);

      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  public getUserByEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.params;

      const data = await usersAction.findUserByEmailOrUsername(email);

      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.user as User;

      const { file } = req;
      const { email, username, firstname, lastname, birthDate, phone, gender } =
        req.body;

      const user = await usersAction.updateSelfById({
        id,
        email,
        username,
        firstname,
        lastname,
        birthDate,
        phone,
        gender,
        avatar: file?.filename,
      });

      res.status(200).json({
        message: 'Update user profile success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
