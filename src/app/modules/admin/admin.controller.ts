import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { adminFilterableFields } from './admin.constant';
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
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AdminServices.getAllAdmins(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admins has been fetched successfully',
    data: result,
  });
});

// get admin by id
const getAdminById = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminByIdFromDB(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin has been fetched successfully',
    data: result,
  });
});

// update admin
const updateAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdminIntoDB(
    req?.params?.id,
    req?.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin has been updated successfully',
    data: result,
  });
});

// hard delete admin
const deleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.deleteAdminFromDB(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      'Admin has been deleted successfully and This action cannot be undone.',
    data: result,
  });
});

// soft delete admin
const softDeleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.softDeleteAdminFromDB(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin has been deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
