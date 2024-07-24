"use server";

export async function getEvents() {
	const res = await fetch("http://localhost:8000/api/events/");

	if (!res.ok) throw new Error("Failed to fetch events");

	return res.json();
}

export async function getEventById(event_id: number) {
	const res = await fetch(`http://localhost:8000/api/events/${event_id}`);

	if (!res.ok) throw new Error("Failed to fetch event");

	return res.json();
}

export async function createEvent(data: Event) {
	const res = await fetch("http://localhost:8000/api/events", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("Failed to create event");

	return res.json();
}
