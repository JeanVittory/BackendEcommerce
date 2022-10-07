import passport from 'passport';
import { Strategy } from 'passport-local';
import { serviceRegisterUsers } from '../test.js';
import { matchPasswords } from '../tools/bcrypt.tools.js';

passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await serviceRegisterUsers.userExist(username);
        if (!user) {
          return done(null, false, { message: 'The user not exist, please try again' });
        }
        const pwdEncrypt = await serviceRegisterUsers.getPassword(username);
        const isMatchingPwd = await matchPasswords(password, pwdEncrypt);
        if (!isMatchingPwd) {
          return done(null, false, { message: 'invalid password' });
        }
        done(null, user);
      } catch (error) {
        return error;
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await serviceRegisterUsers.getUserById(id);
  if (!user) {
    done(err);
  }
  done(null, user);
});
