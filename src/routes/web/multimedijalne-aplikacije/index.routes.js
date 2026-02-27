import { Router } from "express";

import { getIndexPage, getLectionDataPage } from "../../../controllers/web/multimedijalne-aplikacije/index.controller.js";

const router = Router();

router.get("/", getIndexPage);

router.get("/lekcija/:slug", getLectionDataPage);

export default router;
