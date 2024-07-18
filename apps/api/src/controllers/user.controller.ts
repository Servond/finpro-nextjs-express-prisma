import { Request, Response } from "express";
import prisma from "@/prisma";

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

	// do /api/users?name=1
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

			const newUser = await prisma.user.create({
				data: { username, password, email, full_name, phone_number, role },
			});

			return res.status(201).send(newUser);
		} catch (error) {
			return res.status(500).send({ error: "Failed to create user" });
		}
	}
}
