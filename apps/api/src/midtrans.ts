// @ts-ignore
import midtransClient from "midtrans-client";

export const snap = new midtransClient.Snap({
	isProduction: false,
	serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY,
	clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});
