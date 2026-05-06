import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import restaurantRoutes from "./routes/restaurant.js";
import itemRoutes from "./routes/menuitem.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import { startPaymentConsumer } from "./config/payment.consumer.js";

await connectDB();

await connectRabbitMQ();
startPaymentConsumer();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Restaurant service is running on port ${port}`);
});
