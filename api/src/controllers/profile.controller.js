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
  const authHeader = req.headers['authorization'];
  // rome-ignore lint/complexity/useOptionalChain: <explanation>
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token === null) res.render('main', { layout: 'login' });
  if (!jwt.verify(token, env.JWT_SECRET)) res.render('main', { layout: 'login' });
  res.render('main', { layout: 'index' });
};

const getUserProfile = async (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  const authHeader = req.headers['authorization'];
  // rome-ignore lint/complexity/useOptionalChain: <explanation>
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) res.render('main', { layout: 'login' });
  if (!jwt.verify(token, env.JWT_SECRET)) res.render('main', { layout: 'login' });
  const username = req.params.username;
  const user = await serviceRegisterUsers.getUserByUsername(username);
  const { avatar } = user;
  const userData = {
    username: username,
    avatar: avatar,
  };
  res.render('main', { layout: 'users', userData });
};

const auth = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  const { role, username } = req.body;
  if (role === 'admin') {
    const token = jwt.sign({ user: req.body }, env.JWT_SECRET, { expiresIn: env.JWT_EXP_TIME });
    res.json({ token, role });
    //res.redirect(`${URL}/api/v1/profile/admin`);
  }
  if (role === 'user') {
    const token = jwt.sign({ user: req.body }, env.JWT_SECRET, { expiresIn: env.JWT_EXP_TIME });
    res.json({ token, role, username });
    //res.redirect(`${URL}/api/v1/profile/user/${username}`);
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
