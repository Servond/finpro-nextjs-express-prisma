import { PointsController } from "@/controllers/points.controller";
import { Router } from "express";

export class PointsRouter {
	private router: Router;
	private pointsController: PointsController;

	constructor() {
		this.pointsController = new PointsController();
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			"/",
			this.pointsController.getPoints.bind(this.pointsController),
		);

		this.router.get(
			"/:referral_id",
			this.pointsController.getPointById.bind(this.pointsController),
		);

		this.router.post(
			"/:referral_code",
			this.pointsController.addPoints.bind(this.pointsController),
		);
	}

	getRouter(): Router {
		return this.router;
	}
}
