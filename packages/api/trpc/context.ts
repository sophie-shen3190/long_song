import { type Locale, config } from "@config";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { validateSessionToken } from "auth";
import { TeamMembership, type User, UserSession, db, UserRoleSchema } from "database";
import { cookies } from "next/headers";
import { getSignedUrl } from "storage";
import { defineAbilitiesFor } from "../modules/auth/abilities";
import type { z } from "zod";

type ContextParams = FetchCreateContextFnOptions | { isAdmin?: boolean; resHeaders?: Headers };

type ContextUser = {
	name: string | null;
	email: string;
	id: string;
	role: "USER" | "ADMIN";
	emailVerified: boolean;
	avatarUrl: string | null;
	createdAt: Date;
	hashedPassword: string | null;
	onboardingComplete: boolean;
};

export async function createContext(
	params?: ContextParams,
): Promise<{
	user: ContextUser | null;
	session: UserSession | null;
	teamMemberships: (TeamMembership & { team: { id: string; name: string; avatarUrl: string | null } })[] | null;
	abilities: ReturnType<typeof defineAbilitiesFor>;
	locale: Locale;
	isAdmin: boolean;
	responseHeaders?: Headers;
}> {
	const cookieStore = await cookies();
	const sessionId =
		cookieStore.get(config.auth.sessionCookieName)?.value ?? null;
	const { user, session } = sessionId
		? await validateSessionToken(sessionId)
		: { user: null, session: null };

	const teamMemberships = user
		? await Promise.all(
				(
					await db.teamMembership.findMany({
						where: {
							userId: user.id,
						},
						include: {
							team: true,
						},
					})
				).map(async (membership: TeamMembership & { team: { id: string; name: string; avatarUrl: string | null } }) => ({
					...membership,
					team: {
						...membership.team,
						avatarUrl: membership.team.avatarUrl
							? await getSignedUrl(membership.team.avatarUrl, {
									bucket: process.env.NEXT_PUBLIC_AVATARS_BUCKET_NAME as string,
									expiresIn: 360,
								})
							: null,
					},
				})),
			)
		: null;

	const abilities = defineAbilitiesFor({
		user,
		teamMemberships,
	});

	const locale = (cookieStore.get(config.i18n.localeCookieName)?.value ??
		config.i18n.defaultLocale) as Locale;

	return {
		user: user as ContextUser | null,
		session,
		teamMemberships,
		abilities,
		locale,
		isAdmin: !!(params && "isAdmin" in params && params.isAdmin),
		responseHeaders: params && "resHeaders" in params ? params.resHeaders : undefined,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export type UserRole = z.infer<typeof UserRoleSchema>;
