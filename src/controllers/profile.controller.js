const getProfile = (req, res) => {
  const username = req.session.auth.username;
  res.render('main', { layout: 'index', username: username });
};

const auth = (req, res) => {
  const { username, password } = req.body;

  if (username !== 'surstroming' || password !== 'D:') {
    return res.status(401).json({ message: 'invalid password or username, please retry' });
  }
  req.session.auth = {
    username: username,
    authorized: true,
  };
  res.redirect(`http://localhost:8080/api/v1/profile/${username}`);
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('http://localhost:8080/api/v1/login');
};

export { getProfile, auth, logout };
