module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Terjadi kesalahan pada server',
      details: []
    }
  });
};
