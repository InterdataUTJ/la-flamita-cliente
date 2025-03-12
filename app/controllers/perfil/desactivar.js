import ApiToken from '#models/ApiToken.js';
import { PerfilDeleteError } from '#middlewares/error.middleware.js';

export default async function editar(req, res, next) {
  try {
    const user = req.user;
    user.estado = false
    await ApiToken.deleteMany({ user_id: user._id, user_type: "Cliente" });
    await user.save();
    return res.status(204).send();
  } catch (error) {
    return next(new PerfilDeleteError(error.message));
  }
};