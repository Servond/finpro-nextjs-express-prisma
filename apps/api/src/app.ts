import express, { json, urlencoded, Express } from 'express';
import cors from 'cors';
import { PORT } from './config';
import { UserRouter } from './routers/user.router';
import { AuthRouter } from './routers/auth.router';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { EventRouter } from './routers/event.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();

    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    this.app.use(ErrorMiddleware);
  }

  private routes(): void {
    const routers = [new UserRouter(), new AuthRouter(), new EventRouter()];

    routers.forEach((router) => {
      this.app.use('/api', router.getRouter());
    });
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
