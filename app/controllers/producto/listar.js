import Producto from "#models/Producto.js";
import { ProductoListError } from "#middlewares/error.middleware.js";

export default async function listar(req, res, next) {
    try {
        const productos = await Producto.listar();

        //Hacemos uso de el metodo estatico listar del modelo Producto
        if(!productos){
            return next(new ProductoListError("No se encontraron productos"));
        }

        //Enviamos la respuesta en formato json
        res.json(productos);
    } catch (error) {
        return next(new ProductoListError(error.message));
    }
}