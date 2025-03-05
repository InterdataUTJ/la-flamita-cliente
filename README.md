<h1 align="center">
  <img src="./public/la-flamita-web.svg" alt="la-flamita-web" width="200">
  <br>
  La Flamita Cliente
  <br>
  <br>
</h1>

<p align="center">
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Built_using-ExpressJS-yellowgreen.svg?logo=express" alt="expressjs"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/Using-React-blue.svg?logo=react" alt="react"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Made_with-Tailwind-blue.svg?logo=tailwindcss" alt="tailwindcss"></a>
  <a href="https://flowbite.com/"><img src="https://img.shields.io/badge/Using-Flowbite-blue.svg" alt="flowbite"></a>
</p>

> [!NOTE]
> Este es un `submodule` que forma parte del proyecto [`la-flamita`](https://github.com/InterdataUTJ/la-flamita/).

> [!IMPORTANT]
> Este proyecto solo representa el área del cliente. Puedes consultar el área administrativa desde el repositorio [`la-flamita-admin`](https://github.com/InterdataUTJ/la-flamita-admin/).

Desarrollo Web área cliente de [`Express`](https://expressjs.com/) y [`React`](https://react.dev/) para taquería la flamita. La solución se enfoca en desarrollar toda la infraestructura web (vistas y APIs) para el uso de clientes al adquirir productos.

## Documentación 📕

### Como levantar el entono de desarrollo

1. Primero debes de asegurarte de contar con los requisitos minimos:

  - [`MongoDB`](https://www.mongodb.com/) (_recomendamos cumplir con esta dependencia mediante [`MongoDB Atlas`](https://www.mongodb.com/lp/cloud/atlas/try4)_).
  - [`NodeJS`](https://nodejs.org/en/) minimo versión 18 LTS (_con su respectiva instalación de [`npm`](https://www.npmjs.com/), el cual se incluye por defecto con node_).

2. Clonar el repositorio (_asegurate de tener acceso al repositorio_).

```bash
git clone https://github.com/InterdataUTJ/la-flamita-cliente.git
```

3. Navegar al directorio del repositorio

```bash
cd la-flamita-cliente/
```

4. Configurar las variables de entorno. 

```bash
cp .env.example .env
```


5. Instalar dependencias.

```bash
npm install
```

6. Arrancar la base de datos.

_Este proceso dependera de la instalación de BD a elegir, es completamente independiente del proyecto. El unico requisito adicional es crear la base de datos con el mismo nombre de las variables de entorno (No es necesario crear tablas manualmente)._

7. Preparar frontend

Primero es necesario preparar las dependencias del frontend

```bas
cd react/
npm install
```

Si quieres trabajar en el modo desarrollo solo necesitas iniciar el servidor Vite
```bash
npm run dev
```

O tambien puedes hacer un build de la app de React para poder usarse desde la misma URL de express

```bash
npm run build
```

8. Arrancar el servidor express

```bash
npm run dev
```



### Modulos del sistema 🧩

- Productos 🌮
- Perfil 🙂
- Ventas 💰
- Carrito 🛒

### Roles de acceso 👑

1. **Cliente** (_Solo ver peril y hacer compras_)