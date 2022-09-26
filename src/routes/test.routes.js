import { Router } from 'express';
import { getProducts } from '../controllers/test.controller.js';

const testRoute = Router();

testRoute.get('/productos-test/:quantity?', getProducts);

export { testRoute };
