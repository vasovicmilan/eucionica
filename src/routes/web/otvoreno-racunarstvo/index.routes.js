import { Router } from "express";

import { 
  getIndexPage, 
  getLectionDataPage, 
  getMaterialsPage,
  exploreHttpEndpoint,
  getHandshakeEndpoint
} from "../../../controllers/web/otvoreno-racunarstvo/index.controller.js";

const router = Router();

// HTML rute
router.get("/", getIndexPage);
router.get('/materijali', getMaterialsPage);
router.get("/lekcija/:slug", getLectionDataPage);

// API rute za HTTP Explorer
router.post("/api/http-explorer", exploreHttpEndpoint);
router.get("/api/http-explorer/handshake", getHandshakeEndpoint);

export default router;