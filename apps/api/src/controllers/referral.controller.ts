import { Request, Response } from "express";
import prisma from "@/prisma";

export class ReferralController {
	async getReferrals(req: Request, res: Response) {
		try {
			const referrals = await prisma.referral.findMany();
			return res.status(200).send(referrals);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch referrals" });
		}
	}

	async getReferralById(req: Request, res: Response) {
		try {
			const { referral_id } = req.params;

			const referral = await prisma.referral.findUnique({
				where: { referral_id: Number(referral_id) },
			});

			if (!referral) {
				return res.status(404).send({ error: "Referral not found" });
			}

			return res.status(200).send(referral);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch referral" });
		}
	}
}
