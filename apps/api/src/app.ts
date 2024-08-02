import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import uploadMiddleware from './middlewares/upload';
import { Routes } from './interfaces/router';
import { ErrorMiddleware } from './middlewares/error.middleware';
import SampleRouter from './routers/sample.router';
import { SampleController } from './controllers/sample.controller';
import { authenticateJWT } from './middlewares/auth.middleware';
import { PORT } from './config';

export default class App {
  private app: Express;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 8080;
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeAdditionalRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    const corsOptions = {
      origin: 'http://localhost:3001', // Frontend URL
      credentials: true,
    };
    this.app.use(cors(corsOptions));
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
      uploadMiddleware.single('file'),
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

  private initializeAdditionalRoutes(): void {
    this.app.get('/api', (req: Request, res: Response) => {
      res.send('Hello, Purwadhika Student API!');
    });

    this.app.use('/api', SampleRouter);

    const sampleController = new SampleController();
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    this.app.put(
      '/api/user',
      authenticateJWT,
      upload.single('profileImage'),
      (req, res) => {
        sampleController.updateUser(req, res);
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

    // Additional error handling
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error: ', err.stack);
          res.status(500).send('Error!');
        } else {
          next();
        }
      },
    );
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
      console.log(`  ➜  [API] Local:   http://localhost:${this.port}/`);
    });
  }
}
