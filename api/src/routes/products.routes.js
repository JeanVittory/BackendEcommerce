import { Router } from 'express';
import { multerMiddleware } from '../tools/multer.tools.js';
import {
  getProducts,
  postProducts,
  putProductsById,
  deleteProductsById,
} from '../controllers/products.controllers.js';

const routerProducts = Router();

routerProducts.get('/:id?', getProducts);
routerProducts.post('/', multerMiddleware, postProducts);
routerProducts.put('/:id', multerMiddleware, putProductsById);
routerProducts.delete('/:id', deleteProductsById);

export { routerProducts };
