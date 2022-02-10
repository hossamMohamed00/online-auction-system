import { SetMetadata } from '@nestjs/common';

/**
 * This decorator will change the metadata to let the route public
 */

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);
