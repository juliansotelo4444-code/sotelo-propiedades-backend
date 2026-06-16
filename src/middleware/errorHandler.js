// Manejo centralizado de errores — todos los errores llegan acá
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[Error ${statusCode}] ${message}`);
  }

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
