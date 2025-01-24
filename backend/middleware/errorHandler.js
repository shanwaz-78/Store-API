export const errorHandler = (err, req, res, next) => {
  console.error(`[Error]:`, err.message);
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

