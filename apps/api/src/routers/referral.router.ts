import { ReferralController } from "@/controllers/referral.controller";
import { Router } from "express";

export class ReferralRouter {
	private router: Router;
	private referralController: ReferralController;

	constructor() {
		this.referralController = new ReferralController();
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			"/",
			this.referralController.getReferrals.bind(this.referralController),
		);

		this.router.get(
			"/:referral_id",
			this.referralController.getReferralById.bind(this.referralController),
		);
	}

	getRouter(): Router {
		return this.router;
	}
}
