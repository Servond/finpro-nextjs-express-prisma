// import express from 'express';
// import { AuthController } from '../controllers/auth.controller';
// import { AuthMiddleware } from '../middleware/auth.middleware'; // Assuming you have a JWT authentication middleware

// const router = express.Router();
// const authController = new AuthController();
// const guard = new AuthMiddleware();

// // Route for user login
// router.post('/login', authController.loginController);

// // Route for user registration
// router.post('/register', authController.createUserController);

// // Route for refreshing tokens
// router.get(
//   '/refresh-token',
//   guard.authenticateJWT,
//   authController.refreshTokenController,
// );

// // Route for verifying email
// router.get(
//   '/verify-email',
//   guard.authenticateJWT,
//   authController.verifyEmailController,
// );

// export default router;

import { Router } from 'express';
// import { UsersController } from '@/controllers/users.contoller';
import { validateUserRegister } from '@/middleware/users.validator';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { AuthController } from '@/controllers/auth.controller';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  private guard: AuthMiddleware;

  constructor() {
    this.authController = new AuthController();
    this.guard = new AuthMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // for register a user, passing { username, email, password, referrerCode, roleId }. this function already INCLUDES login action then return void. send response: access-token and refresh-token cookies
    this.router.post(
      '/register',
      validateUserRegister,
      this.authController.createUserController,
    );

    // for user login, passing { email, password } then return void. send response: access-token and refresh-token cookies
    this.router.post('/login', this.authController.loginController);

    // for refresh user token, passing { email } from refresh-token (jwt) then return void. send response: access-token cookies
    // this.router.get(
    //   '/refresh-token',
    //   this.guard.verifyRefreshToken,
    //   this.authController.refreshTokenController,
    // );

    // passing token in query
    // this.router.get(
    //   '/verify-email',
    //   this.guard.verifyEmailToken,
    //   this.authController.verifyEmailController,
    // );
  }

  getRouter(): Router {
    return this.router;
  }
}
