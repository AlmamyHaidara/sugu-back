import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const IS_PUBLIC_KEY = 'published';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export type PasswordUpdate = {
  userId: number;
  newPassword: string;
  currentPassword: string;
};
