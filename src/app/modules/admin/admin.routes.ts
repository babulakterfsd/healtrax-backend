import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import {
  adminCreateValidationSchema,
  adminUpdateValidationSchema,
} from './admin.validation';

const router = express.Router();

// get admin by id
router.get('/:id', AdminControllers.getAdminById);

// update an admin
router.patch(
  '/:id',
  validateRequest(adminUpdateValidationSchema),
  AdminControllers.updateAdmin
);

// delete an admin permanently
router.delete('/:id', AdminControllers.deleteAdmin);

// soft delete an admin
router.delete('/soft/:id', AdminControllers.softDeleteAdmin);

// create an admin
router.post(
  '/',
  validateRequest(adminCreateValidationSchema),
  AdminControllers.createAdmin
);

// get all admins
router.get('/', AdminControllers.getAllAdmins);

export const AdminRoutes = router;
