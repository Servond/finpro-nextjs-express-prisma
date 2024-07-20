"use server";
import { LoginFormValues } from "@/components/auth/LoginForm";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { User } from "@/types/user.types";
import { redirect, useRouter } from "next/navigation";
import { hash } from "bcryptjs";

const LoginAction = async (data: LoginFormValues) => {
	const credentialsData = {
		email: data.email,
		password: data.password,
		redirectTo: "/",
	};

	try {
		await signIn("credentials", credentialsData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials!" };
				default:
					return { error: "Something went wrong!" };
			}
		}

		throw error;
	}
};

const RegisterAction = async (values: User) => {
	const hashedPassword = await hash(values.password, 10);
	const user = { ...values, password: hashedPassword };
	const res = await fetch("http://localhost:8000/api/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});
	if (res.ok) {
		redirect("/auth/login");
	} else {
		return { error: "Something went wrong!" };
	}
};

export { LoginAction, RegisterAction };
