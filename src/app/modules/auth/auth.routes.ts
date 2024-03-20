import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { authLoginValidationSchema } from './auth.validation';

const router = express.Router();

// login user
router.post(
  '/login',
  validateRequest(authLoginValidationSchema),
  AuthControllers.loginUser
);

// get access token using refresh token
router.post('/refresh-token', AuthControllers.getAccessTokenUsingRefreshToken);

export const AuthRoutes = router;
