import express from "express";
import { setupStatic } from "./configs/static.config.js";
import { setupViewEngine } from "./configs/view.engine.config.js";
import { setupHelmet } from "./configs/helmet.config.js";
import { globalLimiter} from "./middlewares/rate.limiter.middleware.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import router from "./routes/index.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalLimiter);

setupStatic(app);

setupViewEngine(app);

app.set("trust proxy", 1);

setupHelmet(app);

app.use("/", router);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`
  🚀 Server radi na portu ${PORT}`);
});

export default app;