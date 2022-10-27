import passport from 'passport';
import { sessionConfig } from './session.config.js';
import express from 'express';
import { app } from './app.config.js';
import '../config/passport.config.js';

const applicationMiddlewares = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(sessionConfig);
  app.use(passport.initialize());
  app.use(passport.session());
  return;
};

export { applicationMiddlewares };
