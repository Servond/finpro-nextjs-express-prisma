import { z } from "zod";

export const userSchema = z.object({
	user_id: z.number().nullable().optional(),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters long")
		.max(20, "Username must be at most 20 characters long"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	email: z.string().email(),
	full_name: z.string().min(3, "Full name must be at least 3 characters long"),
	phone_number: z
		.string()
		.min(10, "Phone number must be at least 10 characters long"),
	role: z.enum(["participant", "organizer"]),
	created_at: z.string().nullable().optional(),
	updated_at: z.string().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
