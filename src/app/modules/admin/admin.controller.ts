import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

//get all admins
const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdmins();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admins has been fetched successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
};
