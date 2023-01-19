const isAuthenticated = async (error, user, info) => {
  try {
    if (err | user) {
      const error = new Error('Error in athentication proccess');
      return next(error);
    }
    req.login(user, { session: false }, async (err) => {
      if (err) return next(err);
      const body = { id: user.id, email: user.email };
      const token = 
    });
  } catch (error) {}
};

export { isAuthenticated };
