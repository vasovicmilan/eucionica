function isApiRequest(req) {
  return (
    req.baseUrl?.startsWith("/api") ||
    req.originalUrl?.startsWith("/api") ||
    req.headers.accept?.includes("application/json") ||
    req.xhr
  );
}

export function notFound(req, res, next) {
  const error = new Error(`Stranica nije pronađena: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  
  const errorId = Math.random().toString(36).substring(2, 10);
  
  console.error(`[${new Date().toISOString()}] [${errorId}] ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  if (isApiRequest(req)) {
    const response = {
      success: false,
      error: {
        id: errorId,
        message: err.message || 'Došlo je do greške',
        status
      }
    };

    if (process.env.NODE_ENV === 'development') {
      response.error.stack = err.stack;
    }

    return res.status(status).json(response);
  }

  res.status(status).render('error', {
    title: `Greška ${status}`,
    message: err.message || 'Došlo je do greške',
    status,
    errorId,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
}