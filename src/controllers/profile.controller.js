import { app } from '../config/app.config.js';
import { logger } from '../config/logger/index.js';

const getProfile = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  if (req.isAuthenticated()) {
    const username = req.params.username;
    res.render('main', { layout: 'index', username: username });
  } else {
    logger.warn("You're not authenticated");
    res.redirect(`http://localhost:${app.get('port')}/`);
  }
};

const auth = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  const { username } = req.body;
  res.redirect(`http://localhost:${app.get('port')}/api/v1/profile/${username}`);
};

const logout = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  req.logout((err) => {
    if (err) {
      logger.error(err);
      next(err);
    }
    res.redirect(`http://localhost:${app.get('port')}/`);
  });
};

export { getProfile, auth, logout };
