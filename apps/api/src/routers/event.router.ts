import { EventController } from "@/controllers/events.controller";
import { Router } from "express";

export class EventRouter {
	private router: Router;
	private eventController: EventController;

	constructor() {
		this.eventController = new EventController();
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			"/",
			this.eventController.getEvents.bind(this.eventController),
		);

		this.router.get(
			"/:event_id",
			this.eventController.getEventById.bind(this.eventController),
		);

		this.router.post(
			"/",
			this.eventController.createEvent.bind(this.eventController),
		);
	}

	getRouter(): Router {
		return this.router;
	}
}
