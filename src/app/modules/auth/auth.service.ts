/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import { UserStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { prisma } from '../../utils/libs';
import { TLoginInfo } from './auth.interface';

// login user in DB
const loginUserInDB = async (user: TLoginInfo) => {
  const userFromDB = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus?.ACTIVE,
    },
  });

  const isPasswordMatched = await bcrypt.compare(
    user?.password,
    userFromDB.password
  );
  if (!isPasswordMatched) {
    throw new Error('Incorrect password');
  }

  //create token and send it to client side
  const payload = {
    id: userFromDB?.id,
    email: userFromDB?.email,
    role: userFromDB?.role,
  };

  const accesstoken = jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshfToken = jwt.sign(payload, config.jwt_refresh_secret as string, {
    expiresIn: config.jwt_refresh_expires_in,
  });

  return {
    accesstoken,
    refreshfToken,
    userFromDB,
  };
};

//generate access token from refresh token
const getAccessTokenByRefreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Refresh token is required');
  }

  // checking token is valid or not
  let decodedUser: JwtPayload | string;

  try {
    decodedUser = jwt.verify(
      token as string,
      config.jwt_refresh_secret as string
    ) as JwtPayload;
  } catch (error) {
    throw new JsonWebTokenError('Unauthorized Access!');
  }

  const { id, role, email } = decodedUser as JwtPayload;

  // checking if the user exists
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      status: UserStatus?.ACTIVE,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized Access!');
  }

  const payload = {
    id,
    role,
    email,
  };

  const accessToken = jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUserInDB,
  getAccessTokenByRefreshToken,
};
