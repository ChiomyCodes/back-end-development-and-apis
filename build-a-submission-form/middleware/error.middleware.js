const notFoundHandler= (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

const finalErrorHandler = (err, req, res, next) => {
 const status = err.status || 500;

  console.error(err);

  res.status(status).json({
    error: true,
    status,
    message:
      status === 500
        ? "Internal Server Error (Check Server Logs)"
        : err.message,
  });
 next(err)
}

export {notFoundHandler, finalErrorHandler}