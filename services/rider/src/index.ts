import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Rider service is running on port ${process.env.PORT}`);
  connectDB();
});
