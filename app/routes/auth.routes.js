import { Router } from 'express';
import validate from '#middlewares/validations/auth.js';
import auth from '#middlewares/auth.middleware.js';
const authRouter = Router();

// Import controller
import login from '#controllers/auth/login.js';
import singup from '#controllers/auth/singup.js';
import logout from '#controllers/auth/logout.js';

// Routes
authRouter.post('/login', [validate("login")], login);
authRouter.post('/singup', [validate("singup")], singup);

authRouter.post('/logout', [auth], logout);

// authRouter.post('/auth/google/redirect', googleRedirect);
// authRouter.post('/auth/google/callback', googleCallback);

export default authRouter;