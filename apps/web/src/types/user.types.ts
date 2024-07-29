import { z } from "zod";

export const userSchema = z.object({
	user_id: z.number().nullable().optional(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	email: z.string().email(),
	full_name: z.string().min(3, "Full name must be at least 3 characters long"),
	role: z.enum(["participant", "organizer"]),
	created_at: z.string().nullable().optional(),
	updated_at: z.string().nullable().optional(),
	id: z.string().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
