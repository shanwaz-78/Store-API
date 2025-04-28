import "dotenv/config";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import createConnection from "./config/dbConnection.js";
import routes from "./routes/index.js";

const port = process.env.PORT || "8080";
const MONGO_URI = process.env.MONGO_URI || "";

const app = express();
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
  })
);
app.use(cors());
app.use(express.json());

app.use("/api/v1/products", routes.productRoutes);

app.use(notFound);
app.use(errorHandler);

const server = createServer(app);
server.listen(port);

server.on("listening", async () => {
  const { connection } = await createConnection(MONGO_URI);
  console.log(`Connection successfull to Mongodb port:${connection.port}`);
  console.log(`server is listening on port:${port}`);
});
server.on("error", () =>
  console.log(`server is not listening on port:${port}`)
);
