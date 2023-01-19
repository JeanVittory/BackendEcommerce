import { app } from '../config/app.config.js';
import { logger } from '../config/logger/index.js';
import { serviceRegisterUsers } from '../factory/factoryDaos.js';
import jwt from 'jsonwebtoken';
import env from '../config/env.config.js';

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://apicoder.herokuapp.com'
    : `http://localhost:${app.get('port')}`;

const getAdminProfile = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  if (req.isAuthenticated()) {
    res.render('main', { layout: 'index' });
  } else {
    logger.warn("You're not authenticated");
    res.redirect(`${URL}/`);
  }
};

const getUserProfile = async (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  if (req.isAuthenticated()) {
    const username = req.params.username;

    const user = await serviceRegisterUsers.getUserByUsername(username);
    const { avatar } = user;
    const userData = {
      username: username,
      avatar: avatar,
    };
    res.render('main', { layout: 'users', userData });
  } else {
    logger.warn("You're not authenticated");
    res.redirect(`${URL}/`);
  }
};

const auth = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  console.log(req.body);
  const { role, username } = req.body;
  if (role === 'admin') {
    const token = jwt.sign({ user: req.body }, env.JWT_SECRET, { expiresIn: env.JWT_EXP_TIME });
    res.json({ token });
    //res.redirect(`${URL}/api/v1/profile/admin`);
  }
  if (role === 'user') {
    res.redirect(`${URL}/api/v1/profile/user/${username}`);
  }
};

const logout = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  req.logout((err) => {
    if (err) {
      logger.error(err);
      next(err);
    }
    res.redirect(`${URL}/`);
  });
};

export { getAdminProfile, getUserProfile, auth, logout };
