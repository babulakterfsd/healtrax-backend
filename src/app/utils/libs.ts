import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import config from '../config';
import {
  TOptionsResult,
  TPaginationOptions,
} from '../interface/common.interface';

// prisma client
export const prisma = new PrismaClient();

// make password hashed
export const makePasswordHashed = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds as string)
  );
  return hashedPassword;
};

// pagination helper
export const calculatePagination = (
  options: TPaginationOptions
): TOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;

  const sortBy: string = options.sortBy || 'createdAt';
  const sortOrder: string = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
