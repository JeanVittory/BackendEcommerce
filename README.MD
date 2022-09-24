# API

Api en construcción usando node y el framework Express usando el puerto 8080 por default o configurando APP_PORT como variable de entorno con el puerto de su preferencia

## Rutas

Root:

```sh
http://localhost:8080/api/v1
```

### Productos

En las siguientes rutas se proveeran los endpoints en donde se administraran los diferentes productos en la base datos que solo tendra acceso los usuarios con acceso de administradores

> **Nota:** Para acceder a la administración de los productos por el momento basta con proveer en los headers la variable admin=true.

| Method | Route                 | Reason                                                 |
| ------ | --------------------- | ------------------------------------------------------ |
| Get    | api/v1/productos/:id? | Obtener productos por id o todos si no se provee el id |
| Post   | api/v1/productos/     | Agregar productos a la base de datos                   |
| Put    | api/v1/productos/:id  | Actualizar productos por id                            |
| Delete | api/v1/productos/:id  | Borrar productos por id                                |

> **Nota:** Si se realizan pruebas en postman, clientThunder o similares usar en el body form-data para hacer un upload de la imágen.

### Cart

En las siguientes rutas se proveeran los endpoints para crear carritos de compras en donde se almacenaran los productos a comprar por el cliente desde la UI

> **Nota:** Estas rutas tienen un acceso público por lo tanto no es necesario proveer credenciales.

| Method | Route                                 | Reason                           |
| ------ | ------------------------------------- | -------------------------------- |
| Post   | api/v1/carrito/                       | Crear carrito                    |
| Delete | api/v1/carrito/:id                    | Borrar Carrito                   |
| Get    | api/v1/carrito/:id/productos          | Listar los productos del carrito |
| Post   | api/v1/carrito/:id/productos          | agregar productos al carrito     |
| Delete | api/v1/carrito/:id/productos/:id_prod | Borrar productos del carrito     |

> **Nota:** Es importante que el usuario guarde el id del carrito ya que por medio de el se realizan los procesos de agregado y borrado.

## Instalación

```sh
npm i
npm run dev
```

### Deploy

https://puzzle-garnet-tulip.glitch.me/api/v1/productos

> **Nota:** Recordar setear los headers con admin=true
