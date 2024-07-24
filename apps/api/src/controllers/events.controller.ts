import { Request, Response } from "express";
import prisma from "@/prisma";

export class EventController {
	async getEvents(req: Request, res: Response) {
		try {
			const events = await prisma.event.findMany();
			return res.status(200).send(events);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch events" });
		}
	}

	async getEventById(req: Request, res: Response) {
		try {
			const { event_id } = req.params;

			const event = await prisma.event.findFirst({
				where: { event_id: Number(event_id) },
			});

			if (!event) {
				return res.status(404).send({ error: "Events not found" });
			}

			return res.status(200).send(event);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch event" });
		}
	}

	async createEvent(req: Request, res: Response) {
		try {
			const {
				event_name,
				event_description,
				event_date,
				event_category,
				event_location,
				available_seats,
				total_seats,
				created_by,
			} = req.body;

			const event = await prisma.event.create({
				data: {
					event_name,
					event_description,
					event_date,
					event_category,
					event_location,
					available_seats,
					total_seats,
					created_by,
				},
			});

			return res.status(201).send(event);
		} catch (error) {
			return res.status(500).send({ error: "Failed to add event" });
		}
	}

	async deleteEvent(req: Request, res: Response) {
		try {
			const { event_id } = req.params;

			const event = await prisma.event.delete({
				where: { event_id: Number(event_id) },
			});

			return res.status(200).send(event);
		} catch (error) {
			return res.status(500).send({ error: "Failed to delete event" });
		}
	}
}
