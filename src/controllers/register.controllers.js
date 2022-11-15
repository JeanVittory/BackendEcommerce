import { logger } from '../config/logger/index.js';
import { serviceRegisterUsers } from '../test.js';
import { serviceRegisterAdmin } from '../test.js';
import { hashPassword } from '../tools/bcrypt.tools.js';

const getRegister = (req, res) => {
  logger.info(`accessing the route: ${req.baseUrl}`);
  return res.render('main', { layout: 'register' });
};

const postRegister = async (req, res) => {
  try {
    logger.info(`accessing the route: ${req.baseUrl}`);
    const { email, username, password, address, phone, age, role, avatar } = req.body;
    if (!email || !password || !username) {
      logger.error('Error 400. Please provide an email and a password');
      return res.status(400).json({ error: 'Please provide an email and a password' });
    }
    const newDataUser = {
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: await hashPassword(password),
      address,
      phone,
      age,
      role,
      avatar: req.file.originalname,
    };

    if (role !== 'user' && role !== 'admin') {
      logger.error('Error 409. invalid role');
      return res.status(409).json({ error: 'Invalid role' });
    }

    if (role === 'user') {
      const responseFromRegisterUsers = await serviceRegisterUsers.userExist(
        newDataUser.username,
        newDataUser.email
      );
      if (responseFromRegisterUsers) {
        logger.error('Error 409. The email or the username already exist, please use another.');
        return res
          .status(409)
          .json({ error: 'The email or the username already exist, please use another.' });
      } else {
        const responseFromUserAdded = await serviceRegisterUsers.addUser(newDataUser);
        if (responseFromUserAdded) {
          return res.status(200).json({ response: 'User created', id: responseFromUserAdded._id });
        }
      }
    }

    if (role === 'admin') {
      const responseFromRegisterAdmins = await serviceRegisterAdmin.userExist(
        newDataUser.username,
        newDataUser.email
      );
      if (responseFromRegisterAdmins) {
        logger.error('Error 409. The email or the username already exist, please use another.');
        return res
          .status(409)
          .json({ error: 'The email or the username already exist, please use another.' });
      } else {
        const responseFromUserAdded = await serviceRegisterAdmin.addUser(newDataUser);
        if (responseFromUserAdded) {
          return res.status(200).json({ response: 'User created', id: responseFromUserAdded._id });
        }
      }
    }
  } catch (error) {
    console.log(error);
    logger.error(`Error 500. ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export { getRegister, postRegister };
