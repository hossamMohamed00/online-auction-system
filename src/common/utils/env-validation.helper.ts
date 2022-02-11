import * as Joi from 'joi';

/**
 * Create and return a validation object for the environment variables.
 * @returns Schema of env variables
 */
export function GetEnvValidationSchema() {
  return Joi.object({
    //? App related variables
    APP_NAME: Joi.string(),
    PORT: Joi.number(),
    //? DB related variables
    DATABASE_CONNECTION_STRING: Joi.string().required(),
    //? Auth related variables
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
    //? Auth related variables
    JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
    JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    EMAIL_CONFIRMATION_URL: Joi.string().required(),
  });
}
