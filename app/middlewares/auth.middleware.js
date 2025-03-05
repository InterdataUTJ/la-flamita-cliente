import ApiToken from '#models/ApiToken.js';
import { JwtMissingError, JwtInvalidError } from '#middlewares/error.middleware.js';

export default async function authMiddleware(req, _, next) {
  const token = req.headers['Authorization'] || req.headers['authorization'] || req.headers['x-access-token'];
  if (!token || !token.toLowerCase()?.startsWith("bearer")) return next(new JwtMissingError());

  try {
    const user = await ApiToken.verificar(token.substring(7));
    if (!user) return next(new JwtInvalidError());
    req.user = user;
    req.user.currentJWT = token.substring(7);
    next();
    
  } catch(err) {
    console.error(err);
    return next(new JwtInvalidError());
  }
}