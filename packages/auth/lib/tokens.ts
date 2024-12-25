import { type RandomReader, generateRandomString } from "@oslojs/crypto/random";
import type { UserOneTimePasswordTypeType, UserVerificationToken } from "database";
import { db } from "database";

const random: RandomReader = {
	read(bytes) {
		crypto.getRandomValues(bytes);
	},
};
const numberAlphabet = "0123456789";

export const generateVerificationToken = async ({
	userId,
	expireDuration = 1000 * 60 * 60 * 2,
}: {
	userId: string;
	expireDuration?: number;
}) => {
	const storedUserTokens = await db.userVerificationToken.findMany({
		where: {
			userId,
		},
	});

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token: UserVerificationToken) => {
			return new Date(Number(token.expires) - expireDuration / 2) >= new Date();
		});
		if (reusableStoredToken) {
			return reusableStoredToken.id;
		}
	}

	const { id } = await db.userVerificationToken.create({
		data: {
			expires: new Date(new Date().getTime() + expireDuration),
			userId,
		},
	});

	return id;
};

export const validateVerificationToken = async ({
	token,
}: {
	token: string;
}) => {
	const storedToken = await db.userVerificationToken.findUnique({
		where: {
			id: token,
		},
	});

	if (!storedToken) {
		return false;
	}

	if (new Date(storedToken.expires) < new Date()) {
		await db.userVerificationToken.delete({
			where: {
				id: token,
			},
		});
		return false;
	}

	await db.userVerificationToken.delete({
		where: {
			id: token,
		},
	});

	return true;
};

export const generateOneTimePassword = async ({
	userId,
	type,
	identifier,
	expireDuration = 1000 * 60 * 60 * 2,
}: {
	userId: string;
	type: UserOneTimePasswordTypeType;
	identifier: string;
	expireDuration?: number;
}) => {
	const code = await generateRandomString(random, 6, numberAlphabet);

	await db.userOneTimePassword.deleteMany({
		where: {
			userId,
			type,
			identifier,
		},
	});

	await db.userOneTimePassword.create({
		data: {
			code,
			expires: new Date(new Date().getTime() + expireDuration),
			userId,
			type,
			identifier,
		},
	});

	return code;
};

export const validateOneTimePassword = async ({
	code,
	type,
	identifier,
}: {
	code: string;
	type: UserOneTimePasswordTypeType;
	identifier?: string;
}) => {
	const storedCode = await db.userOneTimePassword.findFirst({
		where: {
			code,
			type,
			identifier,
		},
	});

	if (!storedCode) {
		return null;
	}

	if (new Date(storedCode.expires) < new Date()) {
		await db.userOneTimePassword.delete({
			where: {
				id: storedCode.id,
			},
		});
		return null;
	}

	const { userId } = storedCode;

	await db.userOneTimePassword.delete({
		where: {
			id: storedCode.id,
		},
	});

	return userId;
};
