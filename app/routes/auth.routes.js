import { Router } from 'express';
import validate from '#middlewares/validations/auth.js';
import checkValidationResult from '#middlewares/validations/index.js';
import authMiddleware from '#middlewares/auth.middleware.js';
const authRouter = Router();

// Import controller
import login from '#controllers/auth/login.js';
import logout from '#controllers/auth/logout.js';

// Routes
authRouter.post('/login', [validate("login"), checkValidationResult], login);
// authRouter.post('/singup', [validate("singup"), checkValidationResult], singup);

authRouter.post('/logout', [authMiddleware], logout);

// authRouter.post('/auth/google/redirect', googleRedirect);
// authRouter.post('/auth/google/callback', googleCallback);

export default authRouter;