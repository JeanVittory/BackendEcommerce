const authorizedProfile = (req, res, next) => {
  if (!req.session?.auth?.authorized) {
    res.cookie('redirected', 'true', {
      maxAge: 1000,
    });
    res.redirect(302, 'http://localhost:8080/');
  } else {
    next();
  }
};

export { authorizedProfile };
