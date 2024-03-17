import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/:id', AdminControllers.getAdminById);
router.patch('/:id', AdminControllers.updateAdmin);
router.delete('/:id', AdminControllers.deleteAdmin);
router.delete('/soft/:id', AdminControllers.softDeleteAdmin);
router.post('/', AdminControllers.createAdmin);
router.get('/', AdminControllers.getAllAdmins);

export const AdminRoutes = router;
