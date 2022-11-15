import passport from 'passport';
import { sessionConfig } from './session.config.js';
import express from 'express';
import { app } from './app.config.js';
import '../config/passport.config.js';

const applicationMiddlewares = () => {
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(sessionConfig);
  app.use(passport.initialize());
  app.use(passport.session());
  return;
};

export { applicationMiddlewares };
