import { Router } from 'express';
import passport from 'passport';
import { auth, getProfile, logout } from '../controllers/profile.controller.js';

const routerProfile = Router();

routerProfile.post(
  '/',
  passport.authenticate('login', {
    failureRedirect: 'http://localhost:8080/',
  }),
  auth
);
routerProfile.get('/:username', getProfile);
routerProfile.post('/logout', logout);

export { routerProfile };
