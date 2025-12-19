import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/car-rental";

export async function connectDB() {
  try {
    // Avoid deprecation warnings for query filters in older codebases
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(MONGO_URI);

    console.log(
      `MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`
    );
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.connection.close();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error("Error while disconnecting MongoDB:", err);
  }
}

export default connectDB;
