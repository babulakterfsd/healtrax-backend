import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/get-all-admins', AdminControllers.getAllAdmins);

export const AdminRoutes = router;
