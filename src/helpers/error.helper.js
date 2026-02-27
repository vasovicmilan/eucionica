export function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

export const errors = {
  badRequest: (msg = 'Neispravan zahtev') => createError(400, msg),
  unauthorized: (msg = 'Neautorizovan pristup') => createError(401, msg),
  forbidden: (msg = 'Zabranjen pristup') => createError(403, msg),
  notFound: (msg = 'Resurs nije pronađen') => createError(404, msg),
  conflict: (msg = 'Konflikt sa postojećim resursom') => createError(409, msg),
  tooManyRequests: (msg = 'Previše zahteva') => createError(429, msg),
  server: (msg = 'Greška na serveru') => createError(500, msg)
};