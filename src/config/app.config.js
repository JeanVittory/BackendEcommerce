import express from 'express';
import { engine } from 'express-handlebars';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { routerProfile } from '../routes/profile.routes.js';
import { routerCart } from '../routes/cart.routes.js';
import { routerProducts } from '../routes/products.routes.js';
import { testRoute } from '../routes/test.routes.js';
import env from './env.config.js';
import { sessionConfig } from './session.config.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);

app.use(express.static(path.join(__dirname, '../public/views/mainApp')));
app.use('/api/v1/login', express.static(path.join(__dirname, '../public/views/login')));
app.use('/api/v1/test', express.static(path.join(__dirname, '../public/views/testData')));

app.use('/api/v1/profile', routerProfile);
app.use('/api/v1/productos', routerProducts);
app.use('/api/v1/carrito', routerCart);
app.use('/api/v1/test', testRoute);

app.get('/prueba', (req, res) => {
  res.render('main', { layout: 'index' });
});

app.set('views', './src/views/mainApp');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('port', env.PORT);

export { app };
