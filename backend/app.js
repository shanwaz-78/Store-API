import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import routes from "./routes/index.js";

const app = express();

// Middlewares
app.use(rateLimit(config.rateLimitOptions));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/products", routes.productRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
