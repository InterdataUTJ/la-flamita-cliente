import { google } from 'googleapis';
import { GoogleAuthError } from '#middlewares/error.middleware.js';
import Cliente from '#models/Cliente.js';
import ApiToken from '#models/ApiToken.js';
import mime from 'mime-types';
import * as storage from '#util/storage/index.js';

export default async function googleCallback(req, res, next) {
  try {
    if (!req.query?.code) throw new GoogleAuthError();
    if (!!req.query?.error) throw new GoogleAuthError(req.query?.error);

    const redirectTo = process.env.NODE_ENV === 'production' 
      ? `${process.env.APP_URL}/login/google`
      : `http://localhost:5173/login/google`;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectTo
    );
    
    const { tokens } = await oauth2Client.getToken(req.query?.code);
    oauth2Client.setCredentials(tokens);
  
    const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
    const { data } = await oauth2.userinfo.get();

    const clienteExists = await Cliente.findOne({ google_id: data.id });
    let clienteId;

    if (!clienteExists) {
      const cliente = new Cliente();
      cliente.nombre = data.given_name;
      cliente.apellido = data.family_name;
      cliente.correo = data.email;
      cliente.google_id = data.id;

      // download the avatar using fetch
      const avatar = await fetch(data.picture);
      const extension = mime.extension(avatar.headers.get("content-type"));
      cliente.avatar = await storage.save(`/imagenes/clientes/avatar_${cliente._id}.${extension}`, Buffer.from(await avatar.arrayBuffer()));
      
      // save the cliente
      await cliente.save();
      clienteId = cliente._id;
    
    } else clienteId = clienteExists._id;

    const token = await ApiToken.crear(clienteId, "Cliente");
    return res.json({ token });

  } catch (e) {
    return next(new GoogleAuthError(e.message));
  }
};