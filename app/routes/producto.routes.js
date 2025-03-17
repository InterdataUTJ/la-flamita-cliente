import { Router } from 'express';
const productoRouter = Router();

//Rutas del producto
import listar from '../controllers/producto/listar.js';
import mostrar from '../controllers/producto/mostrar.js';

// Routes
productoRouter.get('/listar', listar);
productoRouter.get('/mostrar/:productoId', mostrar);

export default productoRouter;

