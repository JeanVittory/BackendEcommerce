const authorization = () => {
  return (req, res, next) => {
    const { admin } = req.headers;
    if (!admin) {
      res.status(401).json({ error: '-1', descripcion: 'Ruta no autorizada' });
    } else {
      next();
    }
  };
};

export { authorization };
