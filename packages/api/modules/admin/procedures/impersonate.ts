import { TRPCError } from "@trpc/server";
import {
	createSession,
	createSessionCookie,
	generateSessionToken,
	invalidateSession,
} from "auth";
import { db } from "database";
import { logger } from "logs";
import { z } from "zod";
import { adminProcedure } from "../../../trpc/base";
import type { Context } from "../../../trpc/context";

export const impersonate = adminProcedure
	.input(
		z.object({
			userId: z.string(),
		}),
	)
	.output(z.void())
	.mutation(
		async ({
			input: { userId },
			ctx: { user, session, responseHeaders },
		}: {
			input: { userId: string };
			ctx: Context;
		}) => {
			if (!responseHeaders) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Response headers are required for this operation",
				});
			}

			// check if user with id exists
			const userExists = await db.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!userExists) {
				throw new TRPCError({ 
					code: "NOT_FOUND",
					message: "User not found",
				});
			}

			try {
				const newSessionToken = generateSessionToken();
				await createSession(newSessionToken, userId, {
					impersonatorId: user.id,
				});

				await invalidateSession(session.id);

				responseHeaders.append(
					"Set-Cookie",
					createSessionCookie(newSessionToken).serialize(),
				);
			} catch (e) {
				logger.error(e);

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to create impersonation session",
				});
			}
		},
	);
