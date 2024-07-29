"use server";

import { Transaction } from "@/types/transaction.types";

export async function getTransactions() {
	const res = await fetch("http://localhost:8000/api/transactions", {
		cache: "no-cache",
	});

	if (!res.ok) throw new Error("Failed to fetch transactions");

	return res.json();
}

export async function getTransactionsByUserId(user_id: number) {
	const res = await fetch(`http://localhost:8000/api/transactions/${user_id}`, {
		cache: "no-cache",
	});

	if (!res.ok) throw new Error("Failed to fetch transactions");

	return res.json();
}

export async function createTransaction(data: Transaction) {
	try {
		const res = await fetch("http://localhost:8000/api/transactions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) throw new Error("Failed to create transaction");

		return res.json();
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}
