import { PerfilShowError } from '#middlewares/error.middleware.js';

export default async function perfil(req, res, next) {
  try {
    const { clave, ...user } = req.user.toObject();
    return res.json(user);
  } catch (error) {
    return next(new PerfilShowError(error.message));
  }
};