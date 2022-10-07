const getProfile = (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.params.username;
    res.render('main', { layout: 'index', username: username });
  } else {
    res.redirect('http://localhost:8080/api/v1/login');
  }
};

const auth = (req, res) => {
  const { username, password } = req.body;
  res.redirect(`http://localhost:8080/api/v1/profile/${username}`);
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('http://localhost:8080/api/v1/login');
};

export { getProfile, auth, logout };
