import { Router } from 'express';
import { auth } from '../controllers/auth.controller.js';

const routerAuth = Router();

routerAuth.post('/', auth);

export { routerAuth };
