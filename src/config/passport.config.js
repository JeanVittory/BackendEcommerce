import passport from 'passport';
import { Strategy } from 'passport-local';
import { serviceRegisterUsers } from '../test.js';
import { serviceRegisterAdmin } from '../test.js';
import { matchPasswords } from '../tools/bcrypt.tools.js';

passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { role } = req.body;

        if (role !== 'admin' && role !== 'user') {
          done(null, false, { message: 'Something went wrong' });
        }

        if (role !== 'admin') {
          const user = await serviceRegisterUsers.userExist(username);
          if (!user) {
            return done(null, false, { message: 'The user not exist, please try again' });
          }
          const pwdEncrypt = await serviceRegisterUsers.getPassword(username);
          const isMatchingPwd = await matchPasswords(password, pwdEncrypt.password);
          if (!isMatchingPwd) {
            return done(null, false, { message: 'invalid password' });
          }

          done(null, user);
        } else {
          const admin = await serviceRegisterAdmin.userExist(username);
          if (!admin) {
            return done(null, false, { message: 'The admin not exist, please try again' });
          }
          const pwdEncrypt = await serviceRegisterAdmin.getPassword(username);
          const isMatchingPwd = await matchPasswords(password, pwdEncrypt.password);
          if (!isMatchingPwd) {
            return done(null, false, { message: 'invalid password' });
          }
          done(null, admin);
        }
      } catch (error) {
        return error;
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { id: user._id, role: user.role });
});

passport.deserializeUser(async (useData, done) => {
  const { id, role } = useData;

  if (role === 'user') {
    const user = await serviceRegisterUsers.getUserById(id);
    if (!user) {
      done(err);
    }
    done(null, user);
  }
  if (role === 'admin') {
    const user = await serviceRegisterAdmin.getUserById(id);
    if (!user) {
      done(err);
    }
    done(null, user);
  }
});
