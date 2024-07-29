import { Request, Response } from "express";
import prisma from "@/prisma";

export class TransactionController {
	async getTransactions(req: Request, res: Response) {
		try {
			const transactions = await prisma.transaction.findMany();
			return res.status(200).send(transactions);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch transactions" });
		}
	}

	async getTransactionsByUserId(req: Request, res: Response) {
		try {
			const { user_id } = req.params;

			const transactions = await prisma.transaction.findMany({
				where: { user_id: Number(user_id) },
			});

			return res.status(200).send(transactions);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch transactions" });
		}
	}

	async createTransaction(req: Request, res: Response) {
		try {
			const { user_id, event_id, event_name, quantity, total_amount } =
				req.body;

			const newTransaction = await prisma.transaction.create({
				data: {
					user_id: Number(user_id),
					event_id: Number(event_id),
					event_name: event_name,
					quantity: Number(quantity),
					total_amount: Number(total_amount),
					transaction_status: "PENDING",
				},
			});

			return res.status(201).send(newTransaction);
		} catch (error) {
			return res.status(500).send({ error: "Failed to create transaction" });
		}
	}
}
