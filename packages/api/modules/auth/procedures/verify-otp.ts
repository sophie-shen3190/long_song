import { TRPCError } from "@trpc/server";
import {
	createSession,
	createSessionCookie,
	generateSessionToken,
	validateOneTimePassword,
} from "auth";
import { UserOneTimePasswordTypeSchema, db } from "database";
import { logger } from "logs";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const verifyOtp = publicProcedure
	.input(
		z.object({
			type: UserOneTimePasswordTypeSchema,
			identifier: z.string(),
			code: z.string(),
		}),
	)
	.mutation(
		async ({ input: { type, identifier, code }, ctx: { responseHeaders } }) => {
			try {
				const userId = await validateOneTimePassword({
					type,
					identifier,
					code,
				});

				if (!userId) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Invalid or expired one-time password",
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
				logger.error("Error verifying one-time password", error);
				throw error;
			}
		},
	);
