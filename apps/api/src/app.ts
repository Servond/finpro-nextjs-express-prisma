import express, {
	json,
	urlencoded,
	Express,
	Request,
	Response,
	NextFunction,
	Router,
} from "express";
import cors from "cors";
import { PORT } from "./config";
import { UserRouter } from "./routers/user.router";
import { ReferralRouter } from "./routers/referral.router";
import { PointsRouter } from "./routers/points.router";
import { EventRouter } from "./routers/event.router";

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
		// not found
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			if (req.path.includes("/api/")) {
				res.status(404).send("Not found !");
			} else {
				next();
			}
		});

		// error
		this.app.use(
			(err: Error, req: Request, res: Response, next: NextFunction) => {
				if (req.path.includes("/api/")) {
					console.error("Error : ", err.stack);
					res.status(500).send("Error !");
				} else {
					next();
				}
			},
		);
	}

	private routes(): void {
		const userRouter = new UserRouter();
		const referralRouter = new ReferralRouter();
		const pointRouter = new PointsRouter();
		const eventRouter = new EventRouter();

		this.app.get("/api", (req: Request, res: Response) => {
			res.send(`Hello, Purwadhika Student API!`);
		});

		this.app.use("/api/users", userRouter.getRouter());
		this.app.use("/api/referrals", referralRouter.getRouter());
		this.app.use("/api/points", pointRouter.getRouter());
		this.app.use("/api/events", eventRouter.getRouter());
	}

	public start(): void {
		this.app.listen(PORT, () => {
			console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
		});
	}
}
