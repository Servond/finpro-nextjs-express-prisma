import { z } from "zod";

export const eventSchema = z.object({
	event_id: z.number().nullable().optional(),
	event_name: z
		.string()
		.min(3, "Event name must be at least 3 characters long"),
	event_description: z
		.string()
		.min(3, "Event description must be at least 3 characters long"),
	event_date: z.string(),
	event_time: z.string(),
	event_location: z
		.string()
		.min(3, "Event location must be at least 3 characters long"),
	available_seats: z.number(),
	created_by: z.number(),
	created_at: z.string().nullable().optional(),
	updated_at: z.string().nullable().optional(),
	category_id: z.number(),
});

export type Event = z.infer<typeof eventSchema>;
