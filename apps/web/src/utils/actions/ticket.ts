"use server";

import { Ticket } from "@/types/ticket.types";

export async function getTickets() {
	const res = await fetch("http://localhost:8000/api/tickets", {
		cache: "no-cache",
	});

	if (!res.ok) throw new Error("Failed to fetch events");

	return res.json();
}

export async function getTicketByUserAndEventId(
	user_id: number,
	event_id: number,
) {
	const res = await fetch(
		`http://localhost:8000/api/events/${event_id}/tickets/${user_id}`,
		{
			cache: "no-cache",
		},
	);

	if (!res.ok) throw new Error("Failed to fetch event");

	const data = await res.json();

	if (data.length === 0) return null;

	return data[0];
}

export async function createTicket(data: Ticket) {
	try {
		const res = await fetch("http://localhost:8000/api/events/tickets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) throw new Error("Failed to create event");

		return res.json();
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}
