  import express from 'express';
  import authMiddleware from '../middlewares/auth.js';
  import {
    placeOrder,
    verifyOrder, // <-- New Import
    UsersOrders,
    listOrders,
    UpdateStatus
  } from '../controllers/ordercontroller.js';

  const router = express.Router();

  // Place a new order
  router.post('/place', authMiddleware, placeOrder);

  // Verify Order Status and Finalize/Cancel
  router.post('/verify', authMiddleware, verifyOrder); 

  // Get all orders for a user
  router.post('/userorders', authMiddleware, UsersOrders);

  // Get all orders (admin view)
  router.get('/list', listOrders);

  // Update order status
  router.post('/status', UpdateStatus);

  export default router;