"use server";

import { redirect } from "next/navigation";

export async function getEvents() {
	const res = await fetch("http://localhost:8000/api/events", {
		cache: "no-cache",
	});

	if (!res.ok) throw new Error("Failed to fetch events");

	return res.json();
}

export async function getOrganizerEvents(organizer_id: number) {
	const res = await fetch(
		`http://localhost:8000/api/organizers/${organizer_id}/events`,
		{
			cache: "no-cache",
		},
	);

	if (!res.ok) throw new Error("Failed to fetch events");

	return res.json();
}

export async function getEventById(event_id: number) {
	const res = await fetch(`http://localhost:8000/api/events/${event_id}`, {
		cache: "no-cache",
	});

	if (!res.ok) throw new Error("Failed to fetch event");

	return res.json();
}

export async function createEvent(data: Event) {
	try {
		const res = await fetch("http://localhost:8000/api/events", {
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
	} finally {
		redirect("/dashboard/events");
	}
}

export async function deleteEvent(event_id: number) {
	const res = await fetch(`http://localhost:8000/api/events/${event_id}`, {
		method: "DELETE",
	});

	if (!res.ok) throw new Error("Failed to delete event");

	return res.json();
}

export async function getEventAttendees(event_id: number) {
	const res = await fetch(
		`http://localhost:8000/api/events/${event_id}/attendees`,
		{
			cache: "no-cache",
		},
	);

	if (!res.ok) throw new Error("Failed to fetch event attendees");

	return res.json();
}
