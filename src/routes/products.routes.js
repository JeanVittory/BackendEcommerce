import { Router } from 'express';
import { multerMiddleware } from '../tools/multer.tools.js';
import {
  getProducts,
  postProducts,
  putProductsById,
  deleteProductsById,
} from '../controllers/products.controllers.js';
import { authorization } from '../middleware/authRoute.middleware.js';

const routerProducts = Router();

routerProducts.get('/:id?', authorization(), getProducts);
routerProducts.post('/', authorization(), multerMiddleware, postProducts);
routerProducts.put('/:id', authorization(), multerMiddleware, putProductsById);
routerProducts.delete('/:id', authorization(), deleteProductsById);

export { routerProducts };
