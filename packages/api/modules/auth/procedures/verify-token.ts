import { TRPCError } from "@trpc/server";
import {
	createSession,
	createSessionCookie,
	generateSessionToken,
	validateVerificationToken,
} from "auth";
import { db } from "database";
import { logger } from "logs";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const verifyToken = publicProcedure
	.input(
		z.object({
			token: z.string(),
		}),
	)
	.mutation(async ({ input: { token }, ctx: { responseHeaders } }) => {
		try {
			const userId = await validateVerificationToken({
				token,
			});

			if (!userId) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Invalid or expired token",
				});
			}

			const user = await db.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!user) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "User not found",
				});
			}

			if (!user.emailVerified) {
				await db.user.update({
					where: { id: user.id },
					data: {
						emailVerified: true,
					},
				});
			}

			const sessionToken = generateSessionToken();
			await createSession(sessionToken, userId);

			responseHeaders?.append(
				"Set-Cookie",
				createSessionCookie(sessionToken).serialize(),
			);

			return { success: true };
		} catch (error) {
			logger.error("Error verifying token", error);
			throw error;
		}
	});
