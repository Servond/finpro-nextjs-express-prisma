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

export async function getTransactionsByOrganizerId(organizer_id: number) {
	const res = await fetch(
		`http://localhost:8000/api/transactions/organizer/${organizer_id}`,
		{
			cache: "no-cache",
		},
	);

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

export async function payTransaction(transaction_id: number) {
	try {
		const res = await fetch(
			`http://localhost:8000/api/transactions/${transaction_id}/pay`,
			{
				cache: "no-cache",
				method: "POST",
			},
		);

		if (!res.ok) throw new Error("Failed to pay transaction");

		return res.json();
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function cancelTransaction(transaction_id: number) {
	try {
		const res = await fetch(
			`http://localhost:8000/api/transactions/${transaction_id}/cancel`,
			{
				cache: "no-cache",
				method: "POST",
			},
		);

		if (!res.ok) throw new Error("Failed to cancel transaction");

		return res.json();
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}
