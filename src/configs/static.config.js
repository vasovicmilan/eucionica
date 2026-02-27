import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_PATH = path.join(__dirname, "..", "public");
const DATA_PATH = path.join(__dirname, "..", "data");

export const setupStatic = (app) => {
  app.use(
    "/public",
    express.static(PUBLIC_PATH, {
      etag: true,
      lastModified: true,
      maxAge: "7d",
      index: false,
    })
  );

  app.use(
    "/images",
    express.static(path.join(DATA_PATH, "images"), {
      etag: true,
      lastModified: true,
      maxAge: "7d",
      index: false,
      setHeaders: (res) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        res.setHeader("Access-Control-Allow-Origin", "*");
      },
    })
  );

  app.use(
    "/videos",
    express.static(path.join(DATA_PATH, "videos"), {
      etag: true,
      lastModified: true,
      maxAge: "7d",
      index: false,
      setHeaders: (res) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        res.setHeader("Access-Control-Allow-Origin", "*");
      },
    })
  );

  app.use(
    "/pdfs",
    express.static(path.join(DATA_PATH, "pdfs"), {
      etag: true,
      lastModified: true,
      maxAge: "30d",
      index: false,
      setHeaders: (res) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        res.setHeader("Access-Control-Allow-Origin", "*");
      },
    })
  );

  app.use(
    "/jsons",
    express.static(path.join(DATA_PATH, "jsons"), {
      etag: true,
      lastModified: true,
      maxAge: "1d",
      index: false,
    })
  );
};