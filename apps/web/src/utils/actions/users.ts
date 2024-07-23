"use server";

export async function getUsers() {
	const res = await fetch("http://localhost:8000/api/users");

	if (!res.ok) throw new Error("Failed to fetch users");

	return res.json();
}

export async function getUserById(user_id: number) {
	const res = await fetch(`http://localhost:8000/api/users/${user_id}`);

	if (!res.ok) throw new Error("Failed to fetch user");

	return res.json();
}
