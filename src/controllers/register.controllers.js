import { serviceRegisterUsers } from '../test.js';
import { hashPassword } from '../tools/bcrypt.tools.js';

const getRegister = (req, res) => {
  return res.render('main', { layout: 'register' });
};

const postRegister = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Please provide an email and a password' });
    }
    const newDataUser = {
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: await hashPassword(password),
    };

    const responseFromRegisterUsers = await serviceRegisterUsers.userExist(
      newDataUser.username,
      newDataUser.email
    );
    if (responseFromRegisterUsers) {
      return res
        .status(409)
        .json({ error: 'The email or the username already exist, please use another.' });
    }
    const responseFromUserAdded = await serviceRegisterUsers.addUser(newDataUser);
    if (responseFromUserAdded) {
      return res.status(200).json({ response: 'User created', id: responseFromUserAdded._id });
    }
  } catch (error) {
    console.log('error en postRegister controlador', error);
  }
};

export { getRegister, postRegister };
