import { Router } from 'express';
import { auth, logout, getProfile } from '../controllers/profile.controller.js';
import { authorizedProfile } from '../middleware/autorizedProfile.middleware.js';

const routerProfile = Router();

routerProfile.post('/', auth);
routerProfile.get('/:username', authorizedProfile, getProfile);
routerProfile.post('/logout', logout);

export { routerProfile };
