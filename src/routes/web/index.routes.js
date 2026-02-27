import { Router } from 'express';

import { getIndexPage } from "../../controllers/web/index.controller.js";

import otovrenoRacunarstvoRoutes from './otvoreno-racunarstvo/index.routes.js';
import multimedijalneAplikacijeRoutes from './multimedijalne-aplikacije/index.routes.js';

const router = Router();

router.get("/", getIndexPage);

router.use('/otvoreno-racunarstvo', otovrenoRacunarstvoRoutes);

router.use('/multimedijalne-aplikacije', multimedijalneAplikacijeRoutes);

export default router;
