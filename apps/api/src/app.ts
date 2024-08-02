import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import path from 'path';
import upload from './middlewares/upload';
import { Routes } from './interfaces/router';
import { ErrorMiddleware } from './middlewares/error.middleware';

export default class App {
  private app: Express;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = 8080;
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/images', express.static(path.join(__dirname, 'public')));
    this.app.use(
      '/uploads',
      express.static(path.join(__dirname, '..', 'uploads')),
    );
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.app.use('/api', route.router);
    });

    this.app.post(
      '/api/upload',
      upload.single('file'),
      (req: Request, res: Response) => {
        try {
          res
            .status(200)
            .json({ message: 'File uploaded successfully', file: req.file });
        } catch (error) {
          res.status(500).json({ message: 'File upload failed', error });
        }
      },
    );
  }

  private initializeErrorHandling(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api/')) {
        res.status(404).send('API Route not found');
      } else {
        next();
      }
    });

    this.app.use(ErrorMiddleware);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
