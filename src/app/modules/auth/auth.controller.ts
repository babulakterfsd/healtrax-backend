import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.sevice';

//create admin
const createAdmin = catchAsync(async (req, res) => {
  const result = await AuthServices.createAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin has been created successfully.',
    data: result,
  });
});

export const AuthControllers = {
  createAdmin,
};
