// Dependencies
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'node:path';
import errorHandler from '#middlewares/error.middleware.js';
import print from '#util/print/index.js';
import '#config/db.config.js';


// Import routes
import authRouter from '#routes/auth.routes.js';
import perfilRouter from '#routes/perfil.routes.js';
import productoRouter from '#routes/producto.routes.js';
import categoriaRouter from '#routes/categoria.routes.js';
import ventaRouter from '#routes/venta.routes.js';


// Constants
const PORT = process.env.PORT || 8080;
const app = express();


// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());
app.use(express.static('public'));


// Routes
app.use('/api', authRouter);
app.use('/api/perfil', perfilRouter);
app.use('/api/producto', productoRouter);
app.use('/api/categoria', categoriaRouter);
app.use('/api/venta', ventaRouter);

// Frontend
app.use('*', (_, res) => res.sendFile(path.join(import.meta.dirname, 'public/index.html')));


// Error handler
app.use(errorHandler);


// Start server
app.listen(PORT, () => {
  print.log(`Server is running on http://localhost:${PORT}`);
});