import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI : ", process.env.MONGO_URI);
console.log("PORT No. : ", process.env.PORT);

export const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // ✅ Debugging: Check if MONGO_URI is loaded

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file"); // ✅ Prevents undefined errors
    }

    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // 1 means exit with failure
  }
};
