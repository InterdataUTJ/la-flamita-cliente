import { Router } from 'express';
import validate from '#middlewares/validations/producto.js';
const productoRouter = Router();

//Rutas del producto
import listar from '../controllers/producto/listar.js';
import mostrar from '../controllers/producto/mostrar.js';

// Routes
productoRouter.get('/listar', listar);
productoRouter.get('/mostrar/:productoId', [validate("mostrar")], mostrar);

export default productoRouter;

