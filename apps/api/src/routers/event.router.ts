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

		this.router.get(
			"/:event_id/attendees",
			this.eventController.getEventAttendees.bind(this.eventController),
		);

		this.router.post(
			"/",
			this.eventController.createEvent.bind(this.eventController),
		);

		this.router.delete(
			"/:event_id",
			this.eventController.deleteEvent.bind(this.eventController),
		);

		this.router.get(
			"/tickets",
			this.eventController.getTickets.bind(this.eventController),
		);

		this.router.get(
			"/:event_id/tickets",
			this.eventController.getTicketByEventId.bind(this.eventController),
		);

		this.router.get(
			"/:event_id/tickets/:user_id",
			this.eventController.getTicketByUserAndEventId.bind(this.eventController),
		);

		this.router.post(
			"/tickets",
			this.eventController.createTicket.bind(this.eventController),
		);
	}

	getRouter(): Router {
		return this.router;
	}
}
