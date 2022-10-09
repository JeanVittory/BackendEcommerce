# API

Api en construcción usando node y el framework Express. Mas allá de un sistema CRUD se ofrece una aplicación con integración a diferentes bases de datos relacionales y no relacionales como Maria db, Sqlite, Mongo y Firebase. Un chat contruido con Socket IO y un sistema de autenticación y de registro.

## Tech

- [Node.js](https://nodejs.org/en/) - Evented I/O for the backend
- [Express](https://expressjs.com/es/) - Framework to develop the backend
- [Express-handlebars](https://www.npmjs.com/package/express-handlebars) - Engine to develop the UI
- [Normalizr](https://www.npmjs.com/package/normalizr) - Tool to normalize some data in DB
- [Multer](https://www.npmjs.com/package/multer) - Middleware to upload images in server
- [MongoDb](https://www.mongodb.com/) - Optional noSQL database
- [Mysql2](https://www.npmjs.com/package/mysql2) - Optional SQL database
- [Sqlite3](https://www.sqlite.org/index.html) - Optional SQL database for chat
- [firebase-admin](https://www.npmjs.com/package/firebase-admin) - Optional noSQL database
- [Knex](https://knexjs.org/) - Query builder to interact with MariaDb
- [Mongoose](https://mongoosejs.com/) - ODM to interact with mongoDB
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Tool to encrypt the passwords of users
- [Passport](https://www.passportjs.org/) - Authentication middleware
- [Passport-Local](https://www.passportjs.org/packages/passport-local/) - Strategy used of passport to aunthenticate users
- [Express-Session](https://www.npmjs.com/package/express-session) - Middleware to create sessions of users who has been autheticated
- [Connect-Mongo](https://www.npmjs.com/package/connect-mongo) - Module of mongo db t work with session.
- [Socket-io](https://socket.io/) - Library to work with sockets

## Rutas

### Root:

```sh
http://localhost:8080/api/v1
```

### Login

Esta es la ruta inicial de la aplicación desde donde se podra realizar un proceso de login mediante un username y un password.
En el caso de no contar con una cuenta dirijase a la ruta Register.

| Method | Route        | Reason                                     |
| ------ | ------------ | ------------------------------------------ |
| Get    | api/v1/login | Renderizar la UI determinada para el login |

### Register

Esta ruta provee al usuario de una UI para el registro junto con el endpoint definido para regsitrar sus datos en DB, encriptar su contraseña
y redirigir al login para ingresar a la aplicación.

| Method | Route           | Reason                                       |
| ------ | --------------- | -------------------------------------------- |
| Get    | api/v1/register | Renderizar la UI determinada para el sign up |
| Post   | api/v1/register | Registrar el usuario en mongoDB              |

## Profile

| Method | Route                 | Reason                                                           |     |
| ------ | --------------------- | ---------------------------------------------------------------- | --- |
| Post   | api/v1/profile/       | Redirigir al usuario con su username en la URL a la UI de la app |
| Get    | api/v1/profile/       | Renderizar la UI del usuario logueado o redirigir al login       |
| Post   | api/v1/profile/logout | Realizar el logout del usuario y redirir al login                |

### Productos

En las siguientes rutas se proveeran los endpoints en donde se administraran los diferentes productos en la base datos

| Method | Route                 | Reason                                                 |
| ------ | --------------------- | ------------------------------------------------------ |
| Get    | api/v1/productos/:id? | Obtener productos por id o todos si no se provee el id |
| Post   | api/v1/productos/     | Agregar productos a la base de datos                   |
| Put    | api/v1/productos/:id  | Actualizar productos por id                            |
| Delete | api/v1/productos/:id  | Borrar productos por id                                |

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

### Test Data from FakerJs

En la siguiente ruta podras acceder a una tabla de productos con una imágen aleatoria con el fín de proveer de data falsa a la UI que la necesite. Por defecto provee 5 productos pero si el usuario necesita de más o menos cantidad puede hacerla explicita al final de la ruta

| Method | Route                                  | Reason                |
| ------ | -------------------------------------- | --------------------- |
| Get    | /api/v1/test/productos-test/:quantity? | Proveer de data falsa |

### Environment Variables

Cree un archivo .env en la raiz del proyecto y provea estas variables de entorno con las credenciales a la base de datos que desee usar.
En el caso de desear usar la integracion a firebase use la key "firestore" y en el caso de querer usar la integración a mongoDB use la key "mongo" y en el caso de querer usar mariaDB use "sql" en la variable APP_DATABASE_TO_USE

| ENV                    |
| ---------------------- |
| APP_PORT               |
| APP_PORT_SQL           |
| APP_HOST_SQL           |
| APP_USER_SQL           |
| APP_PASSWORD_SQL       |
| APP_DATABASE_SQL       |
| APP_USER_MONGODB       |
| APP_PASSWORD_MONGODB   |
| APP_DATABASE_MONGODB   |
| APP_DATABASE_SESSIONS  |
| APP_DATABASE_FIRESTORE |
| APP_DATABASE_TO_USE    |

## Instalación

```sh
npm i
npm run dev
```

### Deploy

https://puzzle-garnet-tulip.glitch.me/api/v1/productos
