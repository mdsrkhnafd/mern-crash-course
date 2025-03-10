import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(cors({ origin: "*" })); // Allow frontend to access API
app.use(express.json()); // allows us to accept JSON data in the request body
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});
