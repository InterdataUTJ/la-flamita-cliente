import ApiToken from '#models/ApiToken.js';
import { InvalidAuthError } from '#middlewares/error.middleware.js';

export default async function logout(req, res, next) {
  try {
    await ApiToken.eliminar(req.user.currentJWT);
    res.status(204).end();
  } catch (error) {
    return next(new InvalidAuthError());
  }
};