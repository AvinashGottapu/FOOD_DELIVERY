import mongoose from "mongoose";
import 'dotenv/config';
import ordermodel from "./models/ordermodel.js";
import foodmodel from "./models/foodmodel.js"; 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB ?? "mongodb://localhost:27017/food_delivery")
.then(async () => {
  console.log("✅ Connected to MongoDB");

  // Delete all orders
  const orderRes = await ordermodel.deleteMany({});
  console.log(`Deleted ${orderRes.deletedCount} orders`);

  // Delete all food items
  const foodRes = await foodmodel.deleteMany({});
  console.log(`Deleted ${foodRes.deletedCount} food items`);

  mongoose.disconnect();
})
.catch(err => console.error("❌ Error:", err));
