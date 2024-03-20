import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

//login user
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserInDB(req.body);
  const { accesstoken, refreshfToken, userFromDB } = result;

  res.cookie('refreshfToken', refreshfToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User has been logged in succesfully',
    data: {
      user: {
        id: userFromDB?.id,
        email: userFromDB?.email,
        role: userFromDB?.role,
      },
      token: accesstoken,
    },
  });
});

//get access token using refresh token
const getAccessTokenUsingRefreshToken = catchAsync(async (req, res) => {
  const result = await AuthServices.getAccessTokenByRefreshToken(
    req.cookies?.refreshfToken
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token retrieved succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  getAccessTokenUsingRefreshToken,
};
