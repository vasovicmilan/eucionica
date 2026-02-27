import rateLimit from "express-rate-limit";
import path from "path";

function skipStatic(req) {
  // Samo GET zahtevi mogu biti preskočeni
  if (req.method !== "GET") return false;

  const staticExt = [
    ".js", ".css", ".png", ".jpg", ".jpeg", ".svg",
    ".gif", ".woff", ".woff2", ".ttf", ".eot",
    ".ico", ".map", ".mp4", ".webm", ".pdf"
  ];

  const ext = path.extname(req.path).toLowerCase();
  return staticExt.includes(ext);
}

export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipStatic,
  message: { 
    success: false,
    message: "⛔ Previše zahteva. Pokušajte ponovo za minut." 
  }
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minut
  max: 30, // maksimalno 30 API poziva po minuti
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "⛙ API rate limit exceeded. Try again in a minute."
  }
});