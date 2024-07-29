import { z } from "zod";

export const transactionSchema = z.object({
	transaction_id: z.number().nullable().optional(),
	user_id: z.number(),
	event_id: z.number(),
	event_name: z.string().nullable().optional(),
	transaction_date: z.string().nullable().optional(),
	quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
	total_amount: z.coerce.number(),
	transaction_status: z.string().nullable().optional(),
	created_at: z.string().nullable().optional(),
	updated_at: z.string().nullable().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
