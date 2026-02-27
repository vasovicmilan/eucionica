import { Router } from 'express';
import { apiLimiter } from "../middlewares/rate.limiter.middleware.js";

// import apiRoutes from './api/otvoreno-racunarstvo/index.routes.js';
import webRoutes from './web/index.routes.js';

const router = Router();

// router.use('/api',apiLimiter, apiRoutes);

router.use('/', webRoutes);

export default router;
