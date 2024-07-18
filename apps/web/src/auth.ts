import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const nextAuthConfig = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				let user = null;
				const email = credentials.email as string | undefined;
				const password = credentials.password as string | undefined;

				if (!email || !password) {
					throw new CredentialsSignin("Missing credentials");
				}

				console.log(email, password);

				user = await fetch(
					`http://localhost:8000/api/users/email/${email}`,
				).then((res) => res.json());

				if (!user) throw new CredentialsSignin("Invalid email or password");
				if (!user.password)
					throw new CredentialsSignin("Invalid email or password");

				const isPasswordValid = compare(password, user.password);
				console.log(password, user.password, isPasswordValid);

				if (!isPasswordValid)
					throw new CredentialsSignin("Invalid email or password");

				return user;
			},
		}),
	],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);
