import { Router } from "express";

import { getIndexPage, getLectionDataPage, getMaterialsPage } from "../../../controllers/web/otvoreno-racunarstvo/index.controller.js";

const router = Router();

router.get("/", getIndexPage);

router.get('/materijali', getMaterialsPage);

router.get("/lekcija/:slug", getLectionDataPage);

export default router;
