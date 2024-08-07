import { NextFunction, Request, Response } from 'express';
import usersAction from '@/action/user.action';
import { User } from '@/types/express';
import organizersAction from '@/action/organizers.action';

export class OrganizersController {
  // for public use, consume username from params then return organizer profile
  public organizerProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { username } = req.params;

      const organizer = await organizersAction.findOrganizer(username);

      res.status(200).json({
        message: 'Get organizer profile success',
        data: organizer,
      });
    } catch (error) {
      next(error);
    }
  };
}
