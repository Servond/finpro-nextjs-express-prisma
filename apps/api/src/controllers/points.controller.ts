import { Request, Response } from "express";
import prisma from "@/prisma";

export class PointsController {
	async getPoints(req: Request, res: Response) {
		try {
			const points = await prisma.points.findMany();
			return res.status(200).send(points);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch points" });
		}
	}

	async getPointById(req: Request, res: Response) {
		try {
			const { referral_id } = req.params;

			const points = await prisma.points.findFirst({
				where: { referral_id: Number(referral_id) },
			});

			if (!points) {
				return res.status(404).send({ error: "Points not found" });
			}

			return res.status(200).send(points);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch points" });
		}
	}

	async addPoints(req: Request, res: Response) {
		try {
			const { referral_code } = req.params;
			console.log(req.params);

			if (!referral_code) {
				return res.status(400).send({ error: "Referral code is required" });
			}

			const referral = await prisma.referral.findUnique({
				where: { referral_code },
				select: {
					referral_id: true,
					user: true,
				},
			});

			if (!referral) {
				return res.status(404).send({ error: "Referral not found" });
			}

			const expiryDate = new Date();
			expiryDate.setMonth(expiryDate.getMonth() + 3);

			const pointsRecord = await prisma.points.create({
				data: {
					referral_id: referral.referral_id,
					user_id: referral.user.user_id,
					points: 10000,
					expires_at: expiryDate,
				},
			});

			return res
				.status(200)
				.send({ message: "Points added successfully", pointsRecord });
		} catch (error) {
			console.error("Error adding points:", error);
			return res.status(500).send({ error: "Failed to add points" });
		}
	}
}
