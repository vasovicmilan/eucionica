import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { 
  getIndexPage, 
  getLectionDataPage, 
  getMaterialsPage,
  exploreHttpEndpoint,
  getHandshakeEndpoint,
  getJsonExample,
  getHtmlExample,
  getImageExample,
  getPdfExample
} from "../../../controllers/web/otvoreno-racunarstvo/index.controller.js";

const router = Router();

// HTML rute
router.get("/", getIndexPage);
router.get('/materijali', getMaterialsPage);
router.get("/lekcija/:slug", getLectionDataPage);

// API rute za HTTP Explorer
router.post("/api/http-explorer", exploreHttpEndpoint);
router.get("/api/http-explorer/handshake", getHandshakeEndpoint);

// example rute za iframe prikaz
router.get("/api-example/json", getJsonExample);
router.get("/api-example/html", getHtmlExample);
router.get("/api-example/image", getImageExample);
router.get("/api-example/pdf", getPdfExample);

export default router;