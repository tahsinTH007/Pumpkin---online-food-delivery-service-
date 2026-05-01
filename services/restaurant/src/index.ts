import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});
