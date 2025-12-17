import React, { useState, useContext, useEffect } from 'react';
import './placeorder.css';
import { StoreContext } from '../../context/storecontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const PlaceOrder = () => {  
    const { getTotalCartAmount, token, food_list, cartitems, url } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const [data, setData] = useState({ 
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', pincode: '', country: '', phone: ''
    });

    const onchangehandler = e => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const placeorder = async (e) => { 
        e.preventDefault();

        if (!token) {
            toast.error("Please login to place order");
            return;
        }

        let orderItems = [];
        food_list.map(item => {
            if(cartitems[item._id] > 0) {
                let itemInfo = item;
                itemInfo['quantity'] = cartitems[item._id];
                orderItems.push(itemInfo); 
            }
        });

        if(orderItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        const orderData = { 
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + (getTotalCartAmount() > 0 ? 2 : 0)
        };

        try {
            const response = await axios.post(`${url}/api/order/place`, orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                // Redirect to Stripe checkout page
                const { session_url } = response.data; 
                window.location.replace(session_url);
            } else {
                alert("Error initiating payment");
                console.log("Backend error:", response.data);
            }
        } catch (err) {
            console.error("Place order failed:", err.response ? err.response.data : err);
            toast.error("Something went wrong!");
        }
    };

    const totalAmount = getTotalCartAmount();
    const deliveryFee = totalAmount === 0 ? 0 : 2;
    const grandTotal = totalAmount + deliveryFee;

    useEffect(() => {  
        if (!token || totalAmount === 0) navigate('/cart');
    }, [token, totalAmount]);

    return (
        <form onSubmit={placeorder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-feilds">
                    <input required type="text" name="firstName" value={data.firstName} onChange={onchangehandler} placeholder='First Name'/>
                    <input required type="text" name="lastName" value={data.lastName} onChange={onchangehandler} placeholder='Last Name'/>
                </div>
                <input required type="email" name="email" value={data.email} onChange={onchangehandler} placeholder='Email'/>
                <input required type="text" name="street" value={data.street} onChange={onchangehandler} placeholder='Street'/>
                <div className="multi-feilds">
                    <input required type="text" name="city" value={data.city} onChange={onchangehandler} placeholder='City'/>
                    <input required type="text" name="state" value={data.state} onChange={onchangehandler} placeholder='State'/>
                </div>
                <div className="multi-feilds">
                    <input required type="text" name="pincode" value={data.pincode} onChange={onchangehandler} placeholder='Pin Code'/>
                    <input required type="text" name="country" value={data.country} onChange={onchangehandler} placeholder='Country'/>
                </div>
                <input required type="text" name="phone" value={data.phone} onChange={onchangehandler} placeholder='Phone'/>
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>${totalAmount}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>${deliveryFee}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>${grandTotal}</b></div>
                    </div>
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
