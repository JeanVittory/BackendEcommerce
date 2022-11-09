import { app } from '../config/app.config.js';
import { logger } from '../config/logger/index.js';

const URL =
  process.env.NODE_ENV === production
    ? 'https://apicoder.herokuapp.com'
    : `http://localhost:${app.get('port')}`;

const getProfile = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  if (req.isAuthenticated()) {
    const username = req.params.username;
    res.render('main', { layout: 'index', username: username });
  } else {
    logger.warn("You're not authenticated");
    res.redirect(`${URL}/`);
  }
};

const auth = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  const { username } = req.body;
  res.redirect(`${URL}/api/v1/profile/${username}`);
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

export { getProfile, auth, logout };
