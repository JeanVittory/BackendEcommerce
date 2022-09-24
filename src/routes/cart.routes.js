import { Router } from 'express';
import {
  deleteCart,
  deleteProductFromCart,
  getProductsFromCart,
  postCart,
  postProductToCart,
} from '../controllers/carts.controllers.js';
import { authorization } from '../middleware/authRoute.middleware.js';

const routerCart = Router();

routerCart.post('/', postCart);
routerCart.delete('/:id', deleteCart);
routerCart.get('/:id/productos', getProductsFromCart);
routerCart.post('/:id/productos', postProductToCart);
routerCart.delete(
  '/:id/productos/:id_prod',
  authorization(),
  deleteProductFromCart
);

export { routerCart };
