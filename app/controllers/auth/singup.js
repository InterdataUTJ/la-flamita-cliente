import Cliente from '#models/Cliente.js';
import ApiToken from '#models/ApiToken.js';
import bcrypt from 'bcryptjs';
import { InvalidAuthError } from '#middlewares/error.middleware.js';

export default async function login(req, res, next) {
  try {
    const { nombre, apellido, correo, clave } = req.body;
    const cliente = new Cliente();
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.correo = correo;
    cliente.clave = await bcrypt.hash(clave, 10);
    await cliente.save();
    
    const token = await ApiToken.crear(cliente._id, "Cliente");
    return res.json({ token });

  } catch (error) {
    if (error.code === 11000) return next(new InvalidAuthError('El correo ya está en uso'));
    return next(new InvalidAuthError(error.message));
  }
};