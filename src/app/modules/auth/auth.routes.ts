import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/create-admin', AuthControllers.createAdmin);

export const AuthRoutes = router;
