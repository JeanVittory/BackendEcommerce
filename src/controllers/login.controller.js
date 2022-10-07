const getLogin = (req, res) => {
  return res.render('main', { layout: 'login' });
};

export { getLogin };
