import { Router } from 'express';
import validate from '#middlewares/validations/carrito.js';
import auth from '#middlewares/auth.middleware.js';
const carritoRouter = Router();

// Import controller
import editar from '#controllers/carrito/editar.js';
import add from '#controllers/carrito/add.js';
import listar from '#controllers/carrito/listar.js';
import eliminar from '#controllers/carrito/eliminar.js';

// Routes
carritoRouter.get('/listar', [auth], listar);
carritoRouter.post('/editar', [auth, validate("editar")], editar);
carritoRouter.put('/editar', [auth, validate("editar")], add);
carritoRouter.delete('/eliminar/:productoId', [auth, validate("eliminar")], eliminar);

export default carritoRouter;