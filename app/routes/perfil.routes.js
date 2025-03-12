import { Router } from 'express';
import validate from '#middlewares/validations/perfil.js';
import auth from '#middlewares/auth.middleware.js';
const perfilRouter = Router();

// Import controller
import perfil from '#controllers/perfil/perfil.js';
import editar from '#controllers/perfil/editar.js';
import desactivar from '#controllers/perfil/desactivar.js';

// Routes
perfilRouter.get('/', [auth], perfil);
perfilRouter.put('/editar', [validate("editar"), auth], editar);
perfilRouter.delete('/desactivar', [auth], desactivar);

export default perfilRouter;