import { UserController } from '@/controllers/user.controller';
import { Router } from 'express';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRouter {
  private router: Router = Router();
  private userController = new UserController();
  private auth = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/users', this.userController.getUsers);
    this.router.get(
      '/user/profile',
      this.auth.verifyToken,
      this.userController.getUser,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
