import { z } from "zod";

export const transactionSchema = z.object({
	transaction_id: z.number().nullable().optional(),
	user_id: z.number(),
	ticket_id: z.number(),
	transaction_date: z.date(),
	quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
	total_amount: z.coerce.number().min(0, "Total amount must be at least 0"),
	payment_id: z.number(),
	created_at: z.string().nullable().optional(),
	updated_at: z.string().nullable().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
