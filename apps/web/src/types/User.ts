import { z } from "zod";

export const userSchema = z.object({
	user_id: z.number(),
	username: z.string(),
	password: z.string().min(8),
	email: z.string().email(),
	full_name: z.string(),
	phone_number: z.string().refine((value) => value.length === 10, {
		message: "Phone number must be 10 digits",
	}),
	role: z.enum(["participant", "organizer"]).refine((value) => value !== null, {
		message: "Role must be either participant or organizer",
	}),
	created_at: z.string().nullable(),
	updated_at: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;
