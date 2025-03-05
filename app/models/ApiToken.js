import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authConfig from "#config/auth.config.js";

const apiTokenSchema = new mongoose.Schema({
  user_type: { type: String, required: true, enum: ["Empleado", "Cliente"] },
  user_id: { type: String, required: true },
  jwt: { type: String, required: true }
});

// Unique without counting undefined values
apiTokenSchema.index({ jwt: 1 }, { unique: true });

// Methods
apiTokenSchema.statics.crear = async function(user_id, user_type = "Empleado") {
  const newModel = new this();
  newModel.user_type = user_type === "Empleado" ? "Empleado" : "Cliente";
  newModel.user_id = user_id;
  newModel.jwt = jwt.sign({ user_id, jti: newModel._id }, authConfig.secret, authConfig.options);
  await newModel.save();
  return newModel.jwt;
}

apiTokenSchema.statics.verificar = async function(token) {
  const decoded = jwt.verify(token, authConfig.secret, authConfig.options);
  const apiToken = await this.findOne({ user_id: decoded.user_id, _id: decoded.jti, jwt: token });
  if (!apiToken) return null;
  
  const usuario = await mongoose.model(apiToken.user_type).findById(decoded.user_id);
  if (!usuario) return null;
  return usuario;
}

apiTokenSchema.statics.eliminar = async function(token) {
  const decoded = jwt.verify(token, authConfig.secret, authConfig.options);
  await this.findOneAndDelete({ jwt: decoded.user_id, _id: decoded.jti, jwt: token });
}


export default mongoose.model("ApiToken", apiTokenSchema);