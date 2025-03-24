import { Router } from 'express';
import auth from '#middlewares/auth.middleware.js';
import validate from '#middlewares/validations/venta.js';
const ventaRouter = Router();

// Import controller
import crear from '#controllers/venta/crear.js';
import capturar from '#controllers/venta/capturar.js';
import listar from '#controllers/venta/listar.js';
import mostrar from '#controllers/venta/mostrar.js';


// Routes
ventaRouter.post("/crear", [auth], crear);
ventaRouter.get("/listar", [auth], listar);
ventaRouter.get("/mostrar/:id", [auth, validate("mostrar")], mostrar);
ventaRouter.get("/capturar", [validate("capturar")], capturar);

export default ventaRouter;