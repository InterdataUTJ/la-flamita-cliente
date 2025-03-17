import { Router } from 'express';
const categoriaRouter = Router();

// Import controller
import listar from '#controllers/categoria/listar.js';
import mostrar from '#controllers/categoria/mostrar.js';


// Routes
categoriaRouter.get('/listar', listar);
categoriaRouter.get('/mostrar/:categoriaId', mostrar);

export default categoriaRouter;