import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT, FRONTEND_URL } from './config';
import { SampleRouter } from './routers/sample.router';
import { EventsRouter } from './routers/events.router';
import { ReviewRouter } from './routers/reviews.router';
import { TicketRouter } from './routers/ticket.router';
import { TransactionRouter } from './routers/transactions.router';
import { PromotionRouter } from './routers/promotions.router';
import { AuthRouter } from './routers/auth.router';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UsersRouter } from './routers/user.router';
// import { AuthController } from './controllers/auth.controller';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default class App {
  private app: Express;
  private prisma: PrismaClient;

  constructor() {
    this.app = express();
    this.prisma = new PrismaClient();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors({ origin: FRONTEND_URL, credentials: true }));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not founds !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const eventsRouter = new EventsRouter();
    const reviewsRouter = new ReviewRouter();
    const ticketsRouter = new TicketRouter();
    const transactionsRouter = new TransactionRouter();
    const promotionsRouter = new PromotionRouter();
    const authRouter = new AuthRouter();
    const usersRouter = new UsersRouter();

    // authRouter.post('/login', async (req: Request, res: Response) => {
    //   const { email, password } = req.body;

    //   const user = await this.prisma.user.findUnique({
    //     where: { email },
    //   });

    //   if (!user || !(await bcrypt.compare(password, user.password))) {
    //     return res.status(401).json({ error: 'Invalid email or password' });
    //   }

    //   const token = jwt.sign(
    //     { userId: user.id, role: user.roleId },
    //     JWT_SECRET,
    //     {
    //       expiresIn: '1h',
    //     },
    //   );

    //   res.json({ token });
    // });

    // authRouter.post('/register', authController.createUserController);
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });
    this.app.use('/api/auth', authRouter.getRouter());
    // this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/users', usersRouter.getRouter());
    this.app.use('/api/events', eventsRouter.getRouter());
    this.app.use('/api/reviews', reviewsRouter.getRouter());
    this.app.use('/api/tickets', ticketsRouter.getRouter());
    this.app.use('/api/transactions', transactionsRouter.getRouter());
    this.app.use('/api/promotions', promotionsRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
