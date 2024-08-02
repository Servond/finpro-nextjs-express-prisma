import { Router } from 'express';
import { UsersController } from '@/controllers/users.controller';
import {
  validateUserRegister,
  validateUserUpdate,
} from '@/middleware/users.validator';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { uploader } from '@/libs/uploader';

export class UsersRouter {
  private router: Router;
  private usersController: UsersController;
  private guard: AuthMiddleware;

  constructor() {
    this.usersController = new UsersController();
    this.guard = new AuthMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // for getting user profile, passing { id } from jwt then return user data
    this.router.get(
      '/profile',
      this.guard.verifyAccessToken,
      this.usersController.profileController,
    );

    this.router.get('/:email', this.usersController.getUserByEmailController);
    // for updating user profile, passing { id } from jwt and data in body then return user data
    this.router.patch(
      '/update-profile',
      validateUserUpdate,
      this.guard.verifyAccessToken,
      uploader('avatar', '/avatar').single('file'),
      this.usersController.updateUserController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
