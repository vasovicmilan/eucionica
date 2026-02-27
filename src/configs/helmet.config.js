import helmet from "helmet";

export function setupHelmet(app) {
  const isProd = process.env.NODE_ENV === "production";

  function baseConfig() {
    return {
      crossOriginOpenerPolicy: isProd
        ? { policy: "same-origin" }
        : false,

      crossOriginEmbedderPolicy: isProd ? true : false,

      crossOriginResourcePolicy: {
        policy: "cross-origin",
      },

      hsts: isProd
        ? {
            maxAge: 15552000, // 180 dana
            includeSubDomains: true,
            preload: false,
          }
        : false,

      referrerPolicy: {
        policy: "no-referrer",
      },
    };
  }

  app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/api")) return next();

    const cspDirectives = {
      "default-src": ["'self'"],

      "script-src": ["'self'"],

      "style-src": [
        "'self'",
        "https://fonts.googleapis.com",
      ],

      "font-src": [
        "'self'",
        "https://fonts.gstatic.com",
        "data:",
      ],

      "img-src": [
        "'self'",
        "data:",
        "blob:",
      ],

      "media-src": [
        "'self'",
        "blob:",
      ],

      "frame-src": ["'self'"],

      "frame-ancestors": ["'self'"],

      "object-src": ["'self'"],
      "form-action": ["'self'"],
    };

    return helmet({
      ...baseConfig(),

      contentSecurityPolicy: {
        useDefaults: true,
        directives: cspDirectives,
      },
    })(req, res, next);
  });

  app.use((req, res, next) => {
    if (!req.originalUrl.startsWith("/api")) return next();

    return helmet({
      ...baseConfig(),
      contentSecurityPolicy: false,
    })(req, res, next);
  });
}