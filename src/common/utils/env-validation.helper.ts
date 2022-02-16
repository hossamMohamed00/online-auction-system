import Joi from '@hapi/joi';

/**
 * Create and return a validation object for the environment variables.
 * @returns Schema of env variables
 */
export function GetEnvValidationSchema() {
  // return Joi.object({
  //   //? App related variables
  //   APP_NAME: Joi.string(),
  //   PORT: Joi.number(),
  //   //? DB related variables
  //   DATABASE_CONNECTION_STRING: Joi.string().required(),
  //   //? Auth related variables
  //   ACCESS_TOKEN_SECRET: Joi.string().required(),
  //   ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
  //   REFRESH_TOKEN_SECRET: Joi.string().required(),
  //   REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
  //   //? Email related variables
  //   JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
  //   JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  //   EMAIL_CONFIRMATION_URL: Joi.string().required(),
  //   //? Auth Google related variables
  //   GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
  //   GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
  // });
}
