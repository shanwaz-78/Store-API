import { createServer } from "http";
import { config } from "./config/index.js";
import app from "./app.js";
import createConnection from "./config/dbConnection.js";

const server = createServer(app);

server.listen(config.port);

server.on("listening", async () => {
  const { connection } = await createConnection(config.mongoURI);
  console.log(`Connected to MongoDB on port: ${connection.port}`);
  console.log(`Server is running on port: ${config.port}`);
});

server.on("error", () => console.log(`Server failed to start on port: ${config.port}`));
