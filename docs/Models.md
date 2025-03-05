# MongoDB Models

##### Tabla de contenidos

1. [`Empelado`](#empleado)
2. [`Venta`](#venta)
3. [`Producto`](#producto)
4. [`Cliente`](#cliente)
5. [`Categoria`](#categoria)
6. [`Modulo`](#modulo)
7. [`ApiToken`](#apitoken)



## Empleado

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "apellido": "string",
    "correo": "string",
    "clave": "string",
    "avatar": "string",
    "estado": "boolean",
    "rol": "ENUM('ADMINISTRADOR', 'GERENTE', 'EMPLEADO')",
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "corero": [1, "unique", "sparse"] // Asc - Unique - Sparse
}
```



## Venta

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "empleado_id": "ObjectId", // Relacion con modelo empleado
    "cliente_id": "ObjectId", // Relacion con modelo cliente
    "fecha_venta": "Date",
    "fecha_pago": "Date",
    "estado": "ENUM('PENDIENTE', 'PAGADO', 'COMPLETADO')",
    "token": "string",
    "metodo_pago": "string",
    "paypal_id": "string",
    "productos": [{ // Embedded - ProductoVenta
        "producto_id": "ObjectId",
        "cantidad": "number",
        "precio": "number",
        "descuento": "number",
    }]
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "token": [1, "unique", "sparse"], // Asc - Unique - Sparse
    "paypal_id": [1, "unique", "sparse"], // Asc - Unique - Sparse
}
```



## Producto

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "descripcion": "string",
    "precio": "number",
    "existencias": "number",
    "estado": "boolean",
    "descuento": "number", // Porcentaje
    "fotos": ["string"], // URLs
    "categorias": ["ObjectId"] // Referencia a CategoriaDato
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
}
```



## Cliente

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "apellido": "string",
    "correo": "string",
    "clave": "string",
    "avatar": "string",
    "estado": "boolean",
    "google_id": "string",
    "carrito": [{ // Embedded - CarritoItem
        "producto_id": "ObjectId",
        "cantidad": "number",
        "precio": "number",
        "descuento": "number",
    }]
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "corero": [1, "unique", "sparse"], // Asc - Unique - Sparse
    "google_id": [1, "unique", "sparse"] // Asc - Unique - Sparse
}
```



## Categoria

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "descripcion": "string",
    "datos": [{ // Embedded - CategoriaDato
        "_id": "ObjectId",
        "nombre": "string"
    }]
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "nombre": [1, "unique"], // Asc - Unique
    "datos._id": [1, "unique"], // Asc - Unique
    "datos.nombre": [1, "unique"], // Asc - Unique
}
```



## Modulo

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "token": "string",
    "datos": [{ // Embedded - ModuloDato
        "dato": "string", // Datos serializados
        "timestamp": "Date",
    }]
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "nombre": [1, "unique"], // Asc - Unique
    "token": [1, "unique"], // Asc - Unique
}
```




## ApiToken

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "user_id": "string", // ObjectId _id - Cliente/Empleado
    "jwt": "string"
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "jwt": [1, "unique"], // Asc - Unique
}
```
