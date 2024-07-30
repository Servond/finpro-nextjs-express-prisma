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

	async getEventAttendees(req: Request, res: Response) {
		try {
			const { event_id } = req.params;

			const attendees = await prisma.ticket.findMany({
				where: { event_id: Number(event_id) },
				include: { user: true, event: true },
			});

			return res.status(200).send(attendees);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch attendees" });
		}
	}

	async createEvent(req: Request, res: Response) {
		try {
			const {
				event_name,
				event_description,
				start_date,
				end_date,
				event_category,
				event_location,
				available_seats,
				total_seats,
				ticket_limit,
				ticket_price,
				created_by,
			} = req.body;

			const event = await prisma.event.create({
				data: {
					event_name,
					event_description,
					start_date,
					end_date,
					event_category,
					event_location,
					available_seats,
					total_seats,
					ticket_limit,
					ticket_price,
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

	async getTickets(req: Request, res: Response) {
		try {
			const tickets = await prisma.ticket.findMany();
			return res.status(200).send(tickets);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch tickets" });
		}
	}

	async getTicketByUserAndEventId(req: Request, res: Response) {
		try {
			const { user_id, event_id } = req.params;

			const ticket = await prisma.ticket.findMany({
				where: { user_id: Number(user_id), event_id: Number(event_id) },
			});

			if (!ticket) {
				return res.status(404).send({ error: "Ticket not found" });
			}

			return res.status(200).send(ticket);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch ticket" });
		}
	}

	async getTicketByEventId(req: Request, res: Response) {
		try {
			const { event_id } = req.params;

			const tickets = await prisma.ticket.findMany({
				where: { event_id: Number(event_id) },
			});

			return res.status(200).send(tickets);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch tickets" });
		}
	}

	async createTicket(req: Request, res: Response) {
		try {
			const { user_id, event_id, price, quantity } = req.body;

			const newTicket = await prisma.$transaction(async (prisma) => {
				const ticket = await prisma.ticket.create({
					data: {
						user_id,
						event_id,
						price,
						quantity,
					},
				});

				const event = await prisma.event.findFirst({
					where: { event_id: Number(event_id) },
				});

				if (!event) {
					throw new Error("Event not found");
				}

				const available_seats = event.available_seats - quantity;

				if (available_seats < 0) {
					throw new Error("Not enough available seats");
				}

				await prisma.event.update({
					where: { event_id: Number(event_id) },
					data: { available_seats },
				});

				return ticket;
			});

			return res.status(201).send(newTicket);
		} catch (error) {
			return res.status(500).send({ error: "Failed to add ticket" });
		}
	}
}
