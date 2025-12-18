import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

let pendingOrderData = {};

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    pendingOrderData[userId] = { items, amount, address };

    if (!userId) return res.json({ success: false, message: "User ID not found in token" });
    if (!items || items.length === 0) return res.json({ success: false, message: "Invalid order data" });

    const line_items = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100 * 80)
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 160 * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontend_url}/verify?success=false`
    });

    console.log("✅ Stripe session created:", session.id);

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("❌ Place order error:", error.message, error);
    res.json({ success: false, message: "Error creating checkout session" });
  }
};

// 2️⃣ Verify payment and create order
const verifyOrder = async (req, res) => {
  const { session_id } = req.body;

  try {
    if (!session_id) {
      return res.json({ success: false, message: "Session ID is required" });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "customer_details"],
    });

    if (session.payment_status === "paid") {
      const userId = req.userId; // from JWT

      const items =
        session.line_items?.data.map((li) => ({
          name: li.description,
          price: li.price.unit_amount / 100,
          quantity: li.quantity,
        })) || [];

      if (items.length > 0) items.pop();

      // const amount = session.amount_total / (100 * 80);
      // const address = session.customer_details?.address || {};  

      const DATA = pendingOrderData[userId];
      const amount = DATA.amount;
      const address = DATA.address;


      // Save new order
      const newOrder = new ordermodel({
        userId,
        items,
        amount,
        address,
        payment: true,
        status: "Food Processing",
      });
      await newOrder.save();

      // Clear user's cart
      const result = await usermodel.updateOne(
  { _id: userId },
  { $set: { cartdata: {} } }
);

      console.log("UPDATE RESULT:", result);

      console.log("✅ Cart cleared successfully for user:", userId);

      return res.json({ success: true, message: "Order created successfully" });
    } else {
      return res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Verify order error:", error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

// Get all orders of a user
const UsersOrders = async (req, res) => {
  try {
    const userId = req.userId; // from JWT
    const orders = await ordermodel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("User orders error:", error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// List all orders (admin)
const listOrders = async (req, res) => {
  try {
    const orders = await ordermodel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("List orders error:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// Update order status
const UpdateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) return res.json({ success: false, message: "Invalid data" });

    await ordermodel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Update status error:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyOrder, UsersOrders, listOrders, UpdateStatus };
