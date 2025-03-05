import bcrypt from 'bcryptjs';
import mime from 'mime-types';
import * as storage from '#util/storage/index.js';
import { PerfilUpdateError } from '#middlewares/error.middleware.js';

export default async function editar(req, res, next) {
  try {
    const user = req.user;
    user.nombre = req.body.nombre || user.nombre;
    user.apellido = req.body.apellido || user.apellido;
    user.correo = req.body.correo || user.correo;

    if (req.body.clave) user.clave = await bcrypt.hash(req.body.clave, 10);
    if (req.files && req.files[0]) {
      const nuevoNombre = `/imagenes/clientes/avatar_${user._id}.${mime.extension(req.files[0].mimetype)}`;
      user.avatar = await storage.save(nuevoNombre, req.files[0].buffer);;
    }

    await user.save();
    return res.status(204).send();
  } catch (error) {
    return next(new PerfilUpdateError(error.message));
  }
};