import { Router } from 'express';
import { getRegister, postRegister } from '../controllers/register.controllers.js';

const routerRegister = Router();

routerRegister.get('/', getRegister);
routerRegister.post('/', postRegister);

export { routerRegister };
