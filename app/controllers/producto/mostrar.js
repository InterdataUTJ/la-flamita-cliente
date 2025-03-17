import Producto from "#models/Producto.js";
import { ProductoShowError } from "#middlewares/error.middleware.js";


export default async function mostrar(req, res, next) {

    try{
        //Se obtiene la id del producto
        const idProducto = req.params.productoId;

        //Mediante la id del producto, se busca el producto
        const producto = await Producto.mostrar(idProducto);
        
        if(!producto){
            return next(new ProductoShowError("Producto no encontrado"));
        }

        //Enviamos la respuesta en json
        res.json(producto);

    }catch(error){
        return next(new ProductoShowError(error.message));
    }
}