import { Request, Response } from "express";
import prisma from "@/prisma";
import { snap } from "@/midtrans";

export class TransactionController {
	async getTransactions(req: Request, res: Response) {
		try {
			const transactions = await prisma.transaction.findMany();
			return res.status(200).send(transactions);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch transactions" });
		}
	}

	async getTransactionsByOrganizerId(req: Request, res: Response) {
		try {
			const { organizer_id } = req.params;

			const query = await prisma.$transaction(async (prisma) => {
				const events = await prisma.event.findMany({
					where: { created_by: Number(organizer_id) },
				});

				const transactions = await prisma.transaction.findMany({
					where: {
						event_id: { in: events.map((event) => event.event_id) },
						transaction_status: { notIn: ["PENDING", "FAILED"] },
					},
					include: {
						user: true,
					},
				});

				return transactions;
			});

			return res.status(200).send(query);
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

	async payTransaction(req: Request, res: Response) {
		try {
			const { transaction_id } = req.params;

			const transaction = await prisma.$transaction(async (prisma) => {
				const transaction = await prisma.transaction.findUnique({
					where: { transaction_id: Number(transaction_id) },
				});

				const event = await prisma.event.findUnique({
					where: { event_id: Number(transaction?.event_id) },
				});

				if (!transaction || !event) {
					throw new Error("Transaction or Event not found");
				}

				if (event.available_seats < transaction.quantity) {
					throw new Error("Not enough available seats");
				}

				await prisma.event.update({
					where: { event_id: Number(transaction?.event_id) },
					data: {
						available_seats: event.available_seats - transaction.quantity,
					},
				});

				await prisma.transaction.update({
					where: { transaction_id: Number(transaction_id) },
					data: { transaction_status: "SUCCESS" },
				});

				await prisma.ticket.create({
					data: {
						user_id: transaction.user_id,
						event_id: transaction.event_id,
						price: event.ticket_price,
						quantity: transaction.quantity,
					},
				});

				return transaction;
			});

			return res.status(200).send(transaction);
		} catch (error) {
			return res.status(500).send({ error: "Failed to pay transaction" });
		}
	}

	async cancelTransaction(req: Request, res: Response) {
		try {
			const { transaction_id } = req.params;

			const transaction = await prisma.transaction.findUnique({
				where: { transaction_id: Number(transaction_id) },
			});

			if (!transaction) {
				throw new Error("Transaction not found");
			}

			await prisma.transaction.update({
				where: { transaction_id: Number(transaction_id) },
				data: { transaction_status: "FAILED" },
			});

			return res.status(200).send(transaction);
		} catch (error) {
			return res.status(500).send({ error: "Failed to cancel transaction" });
		}
	}
}

// NOTE: Midtrans Payment
// {
// 		try {
// 			const { transaction_id } = req.params;
//
// 			const transaction = await prisma.transaction.findUnique({
// 				where: { transaction_id: Number(transaction_id) },
// 			});
//
// 			const user = await prisma.user.findUnique({
// 				where: { user_id: Number(transaction?.user_id) },
// 			});
//
// 			let parameter = {
// 				transaction_details: {
// 					order_id: Math.floor(Math.random() * 10000000000000) + 1,
// 					gross_amount: transaction?.total_amount,
// 				},
// 				credit_card: {
// 					secure: true,
// 				},
// 				customer_details: {
// 					first_name: user?.full_name.split(" ")[0],
// 					last_name: user?.full_name.split(" ")[1],
// 					email: user?.email,
// 				},
// 			};
//
// 			const createTransaction = await snap.createTransaction(parameter).then(
// 				(transaction: {
// 					token: string;
// 					redirect_url: string;
// 				}) => {
// 					return transaction;
// 				},
// 			);
//
// 			return res.status(200).send(createTransaction);
// 		} catch (error) {
// 			return res.status(500).send({ error: "Failed to pay transaction" });
// 		}
// 	}
