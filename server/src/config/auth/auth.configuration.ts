import { registerAs } from '@nestjs/config';
export default registerAs('auth', () => ({
  accessToken: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
  refreshToken: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
}));
