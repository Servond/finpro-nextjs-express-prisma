import { Request, Response } from "express";
import prisma from "@/prisma";

async function generateUniqueReferralCode() {
	let referralCode;
	let isUnique = false;

	while (!isUnique) {
		referralCode = Math.random().toString(36).substring(2, 9).toUpperCase();

		const existingReferral = await prisma.referral.findFirst({
			where: {
				referral_code: referralCode,
			},
		});

		if (!existingReferral) {
			isUnique = true;
		}
	}

	return referralCode;
}

export class UserController {
	async getUsers(req: Request, res: Response) {
		try {
			const users = await prisma.user.findMany();
			return res.status(200).send(users);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch users" });
		}
	}

	async getUserById(req: Request, res: Response) {
		try {
			const { user_id } = req.params;

			const user = await prisma.user.findUnique({
				where: { user_id: Number(user_id) },
			});

			if (!user) {
				return res.status(404).send({ error: "User not found" });
			}

			return res.status(200).send(user);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch user" });
		}
	}

	async getUserByField(req: Request, res: Response) {
		try {
			const { field, value } = req.params;

			const user = await prisma.user.findFirst({
				where: {
					[field]: value,
				},
			});

			if (!user) {
				return res.status(404).send({ error: "User not found" });
			}

			return res.status(200).send(user);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch user" });
		}
	}

	async createUser(req: Request, res: Response) {
		try {
			const { username, password, email, full_name, phone_number, role } =
				req.body;

			const newUser = await prisma.$transaction(async (prisma) => {
				const user = await prisma.user.create({
					data: { username, password, email, full_name, phone_number, role },
				});

				const referralCode = await generateUniqueReferralCode();
				const expirationDate = new Date(
					new Date().setMonth(new Date().getMonth() + 3),
				);

				const referral = await prisma.referral.create({
					data: {
						referral_code: referralCode as string,
						referrer_id: user.user_id,
						expires_at: expirationDate,
					},
				});

				return { user, referral };
			});

			return res.status(201).send(newUser);
		} catch (error) {
			console.error("Error creating user:", error);
			return res.status(500).send({ error: "Failed to create user" });
		}
	}
}
