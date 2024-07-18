import { UserController } from "@/controllers/user.controller";
import { Router } from "express";

export class UserRouter {
	private router: Router;
	private userController: UserController;

	constructor() {
		this.userController = new UserController();
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			"/",
			this.userController.getUsers.bind(this.userController),
		);
		this.router.get(
			"/:user_id",
			this.userController.getUserById.bind(this.userController),
		);
		this.router.get(
			"/:field/:value",
			this.userController.getUserByField.bind(this.userController),
		);
		this.router.post(
			"/",
			this.userController.createUser.bind(this.userController),
		);
	}

	getRouter(): Router {
		return this.router;
	}
}
