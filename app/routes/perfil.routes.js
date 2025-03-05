import { Router } from 'express';
import validate from '#middlewares/validations/perfil.js';
import authMiddleware from '#middlewares/auth.middleware.js';
const perfilRouter = Router();

// Import controller
import perfil from '#controllers/perfil/perfil.js';
import editar from '#controllers/perfil/editar.js';

// Routes
perfilRouter.get('/', [authMiddleware], perfil);
perfilRouter.put('/editar', [validate("editar"), authMiddleware], editar);

export default perfilRouter;