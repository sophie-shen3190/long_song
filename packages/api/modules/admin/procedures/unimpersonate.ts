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
import { protectedProcedure } from "../../../trpc/base";

// this procedure has to be "non-admin" because we are requesting it with a regular user session
export const unimpersonate = protectedProcedure
	.input(z.void())
	.output(z.void())
	.mutation(async ({ ctx: { session, responseHeaders } }) => {
		if (!session) {
			throw new TRPCError({ 
				code: "UNAUTHORIZED",
				message: "Session is required for this operation"
			});
		}

		if (!responseHeaders) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Response headers are required for this operation"
			});
		}

		try {
			const currentSession = await db.userSession.findUnique({
				where: {
					id: session.id,
				},
			});

			if (!currentSession?.impersonatorId) {
				throw new TRPCError({ 
					code: "NOT_FOUND",
					message: "No impersonation session found" 
				});
			}

			await invalidateSession(session.id);

			const newSessionToken = generateSessionToken();
			await createSession(newSessionToken, currentSession.impersonatorId);

			responseHeaders.append(
				"Set-Cookie",
				createSessionCookie(newSessionToken).serialize(),
			);
		} catch (e) {
			logger.error(e);

			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
			});
		}
	});
