import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import restaurantRoutes from "./routes/restaurant.js";
import itemRoutes from "./routes/menuitem.js";

await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/item", itemRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Restaurant service is running on port ${port}`);
});
