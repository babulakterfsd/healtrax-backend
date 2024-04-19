import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import {
  adminCreateValidationSchema,
  adminUpdateValidationSchema,
} from './admin.validation';

const router = express.Router();

// get admin by id
router.get(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.getAdminById
);

// update an admin
router.patch(
  '/:id',
  validateRequest(adminUpdateValidationSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.updateAdmin
);

// delete an admin permanently
router.delete(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.deleteAdmin
);

// soft delete an admin
router.delete(
  '/soft/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.softDeleteAdmin
);

// create an admin
router.post(
  '/',
  validateRequest(adminCreateValidationSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.createAdmin
);

// get all admins
router.get(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.getAllAdmins
);

export const AdminRoutes = router;
