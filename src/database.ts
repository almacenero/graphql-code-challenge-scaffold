import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import path from "path"

const binaryMongoPath = path.join(__dirname, "binaryMongo/mongodb-linux-x86_64-debian11-6.0.2")

export const connectToDatabase = async () => {
  try {
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error(error);
  }
};
