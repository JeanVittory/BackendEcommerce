import { Router } from 'express';
import {
  getProducts,
  getTechInfo,
  getRandomNumbers,
  getDataTest,
} from '../controllers/test.controller.js';

const testRoute = Router();

testRoute.get('/helloworld', getDataTest);
testRoute.get('/productos-test/:quantity?', getProducts);
testRoute.get('/tech-info', getTechInfo);
testRoute.get('/randoms', getRandomNumbers);

export { testRoute };
