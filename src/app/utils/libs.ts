import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import config from '../config';

export const prisma = new PrismaClient();

export const makePasswordHashed = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds as string)
  );
  return hashedPassword;
};
