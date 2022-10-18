import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import '../config/passport.config.js';
import { routerCart } from '../routes/cart.routes.js';
import { routerLogin } from '../routes/login.routes.js';
import { routerProducts } from '../routes/products.routes.js';
import { routerProfile } from '../routes/profile.routes.js';
import { routerRegister } from '../routes/register.routes.js';
import { testRoute } from '../routes/test.routes.js';
//import env from './env.config.js';
import { sessionConfig } from './session.config.js';
import { args } from './yargs.config.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../public/views')));
app.use('/api/v1/test', express.static(path.join(__dirname, '../public/views/testData')));
app.use('/api/v1/tech', express.static(path.join(__dirname, '../public/views/techInfo')));

app.use('/api/v1/register', routerRegister);
app.use('/api/v1/login', routerLogin);
app.use('/api/v1/profile', routerProfile);
app.use('/api/v1/productos', routerProducts);
app.use('/api/v1/carrito', routerCart);
app.use('/api/v1/test', testRoute);

app.set('views', './src/views/mainApp');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('port', args.port);

export { app };
