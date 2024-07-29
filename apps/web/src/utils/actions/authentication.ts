"use server";
import { LoginFormValues } from "@/components/auth/LoginForm";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { User } from "@/types/user.types";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { RegisterFormValues } from "@/components/auth/OrganizerRegisterForm";

export const LoginAction = async (data: LoginFormValues) => {
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

export const RegisterAction = async (values: RegisterFormValues) => {
	try {
		const hashedPassword = await hash(values.password, 10);
		const { referral, ...userValues } = values;

		const user = {
			...userValues,
			password: hashedPassword,
		};

		const res = await fetch("http://localhost:8000/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		if (!res.ok) return { error: "Something went wrong!" };

		if (referral) {
			const referralRes = await fetch(
				`http://localhost:8000/api/points/${referral}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!referralRes.ok)
				return {
					error: "User created but referral points not added!",
				};
		}
	} catch (error) {
		return { error: "Something went wrong!" };
	} finally {
		redirect("/auth/login");
	}
};

export const getSession = async () => {
	const session = await auth();

	if (!session?.user) return null;

	return session.user as User;
};
