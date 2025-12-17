import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import './pending.css';
import { assets } from "../../assets/assets";

const AdminOrders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Something went wrong while fetching orders");
    }
  };

  // Update order status
  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });

      if (response.data.success) {
        toast.success("Status updated successfully");
        await fetchAllOrders(); // Refresh list
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Something went wrong while updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Filter only orders that are not delivered
  const pendingOrders = orders.filter(order => order.status !== 'Delivered');

  return (
    <div className="order add">
      <h2>Pending Orders</h2>
      <div className="order-list">
        {pendingOrders.length === 0 && <p>No Pending orders yet.</p>}
        {pendingOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food"> 
                <span className="dot">&#x25cf;</span>
                {(order.items || []).map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p> 
              <p> <span className="dot">&#x25cf;</span> Items: {order.items?.length || 0}</p>
              <p> <span className="dot">&#x25cf;</span> ${order.amount || 0}</p>

              <p className="order-item-name">
                <span className="dot">&#x25cf;</span>
                {order.address?.firstName || ""} {order.address?.lastName || ""}
              </p>

              <div className="order-item-address">
                <p> <span className="dot">&#x25cf;</span> {order.address?.street || ""}</p>
                <p>
                  <span className="dot">&#x25cf;</span>
                  {(order.address?.city || "") +
                    ", " +
                    (order.address?.state || "") +
                    ", " +
                    (order.address?.country || "") +
                    ", " +
                    (order.address?.pincode || "")}
                </p>
              </div>

              <p className="order-item-phone"> <span className="dot">&#x25cf;</span> {order.address?.phone || ""}</p>
            </div>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status || "Food Processing"}
            > 
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
