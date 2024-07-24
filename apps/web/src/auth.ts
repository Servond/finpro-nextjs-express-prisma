import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";

export const nextAuthConfig = {
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

				user = await fetch(
					`http://localhost:8000/api/users/email/${email}`,
				).then((res) => res.json());

				if (!user) throw new CredentialsSignin("Invalid email or password");
				if (!user.password)
					throw new CredentialsSignin("Invalid email or password");

				const hashedPassword = await hash(password, 10);

				const isPasswordValid = compare(hashedPassword, user.password);

				if (!isPasswordValid)
					throw new CredentialsSignin("Invalid email or password");

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }) {
			session.user = token.user as any;
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/register",
	},
	secret: process.env.NEXT_AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);
