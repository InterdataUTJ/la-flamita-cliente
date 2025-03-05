import { InvalidAuthError } from '#middlewares/error.middleware.js';

export default async function perfil(req, res, next) {
  try {
    const { clave, ...user } = req.user.toObject();
    return res.json(user);
  } catch (error) {
    return next(new InvalidAuthError(error.message));
  }
};