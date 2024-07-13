import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient({
			log: ["query", "info", "warn", "error"],
		});
	}
	prisma = global.prisma;
}

export default prisma;
