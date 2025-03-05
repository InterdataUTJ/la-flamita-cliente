import Cliente from '#models/Cliente.js';
import ApiToken from '#models/ApiToken.js';
import bcrypt from 'bcryptjs';
import { InvalidAuthError } from '#middlewares/error.middleware.js';

export default async function login(req, res, next) {
  try {
    const { correo, clave } = req.body;

    const cliente = await Cliente.findOne({ correo });
    const isValidPassword = await bcrypt.compare(clave, cliente?.clave);
    if (!isValidPassword) {
      return next(new InvalidAuthError());
    }

    const token = await ApiToken.crear(cliente._id, "Cliente");
    return res.json({ token });

  } catch (error) {
    return next(new InvalidAuthError());
  }
};