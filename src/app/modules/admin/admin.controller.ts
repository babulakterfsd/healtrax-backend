import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

//create admin
const createAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.createAdminInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin has been created successfully.',
    data: result,
  });
});

//get all admins
const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdmins(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admins has been fetched successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  createAdmin,
};
