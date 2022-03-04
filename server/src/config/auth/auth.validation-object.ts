import * as Joi from '@hapi/joi';

/**
 * Create and return a validation object for auth environment variables.
 * @returns Schema of env variables
 */
export function getAuthConfigValidationObj() {
	return Joi.object({
		ACCESS_TOKEN_SECRET: Joi.string().required(),
		ACCESS_TOKEN_EXPIRATION: Joi.string().default('900s').required(),
		REFRESH_TOKEN_SECRET: Joi.string().required(),
		REFRESH_TOKEN_EXPIRATION: Joi.string().default('7d').required(),
		GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
		GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
	});
}
