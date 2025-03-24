import { Router } from 'express';
import validate from '#middlewares/validations/categoria.js';
const categoriaRouter = Router();

// Import controller
import listar from '#controllers/categoria/listar.js';
import mostrar from '#controllers/categoria/mostrar.js';


// Routes
categoriaRouter.get('/listar', listar);
categoriaRouter.get('/mostrar/:categoriaId', [validate("mostrar")], mostrar);

export default categoriaRouter;