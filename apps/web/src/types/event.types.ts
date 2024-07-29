import { z } from "zod";

export const eventSchema = z
	.object({
		event_id: z.number().nullable().optional(),
		event_name: z
			.string()
			.min(3, "Event name must be at least 3 characters long"),
		event_description: z
			.string()
			.min(3, "Event description must be at least 3 characters long"),
		start_date: z.coerce
			.date()
			.min(new Date(), "Start date cannot be in the past"),
		end_date: z.coerce.date(),
		event_category: z.string(),
		event_location: z
			.string()
			.min(3, "Event location must be at least 3 characters long"),
		available_seats: z.coerce
			.number()
			.min(1, "Available seats must be at least 1"),
		total_seats: z.coerce.number().min(1, "Total seats must be at least 1"),
		ticket_limit: z.coerce.number().min(1, "Ticket limit must be at least 1"),
		ticket_price: z.coerce.number().min(0, "Ticket price must be at least 0"),
		created_by: z.coerce.number(),
		created_at: z.string().nullable().optional(),
		updated_at: z.string().nullable().optional(),
	})
	.refine((data) => data.start_date < data.end_date, {
		message: "End date must be after start date",
		path: ["end_date"],
	});

export type Event = z.infer<typeof eventSchema>;
