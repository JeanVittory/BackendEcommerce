import { Router } from 'express';
import passport from 'passport';
import { auth, logout, getProfile } from '../controllers/profile.controller.js';
import { authorizedProfile } from '../middleware/autorizedProfile.middleware.js';

const routerProfile = Router();

routerProfile.post(
  '/',
  passport.authenticate('login', {
    failureRedirect: 'http://localhost:8080/api/v1/login',
  }),
  auth
);
routerProfile.get('/:username', getProfile);
routerProfile.post('/logout', logout);

export { routerProfile };
