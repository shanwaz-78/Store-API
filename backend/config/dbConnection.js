import { connect } from "mongoose";

async function createConnection(URI) {
  try {
    if (!URI) {
      throw new Error(`Mongo URI is not provided or incorrect.`);
    }

    const connection = await connect(URI);
    return connection;
  } catch (error) {
    console.error(`[Error]: Failed to connect to MongoDB - ${error.message}`);
    throw error;
  }
}

export default createConnection;
