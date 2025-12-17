import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, setcartitems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]); // renamed

  const addToCart = async (ItemId) => {
    setcartitems((prev) => ({ ...prev, [ItemId]: (prev[ItemId] || 0) + 1 }));
    if (token) {
      const response = await axios.post(
        url + "/api/cart/add",
        { ItemId },
        {   headers: { Authorization: `Bearer ${token}` }, }
      );
      setcartitems(response.data.cartdata);
    }
  };

  const removeFromCart = async (ItemId) => {
    setcartitems((prev) => ({ ...prev, [ItemId]: (prev[ItemId] || 0) - 1 }));
    if (token) {
      const response = await axios.post(
        url + "/api/cart/remove",
        { ItemId },
        {   headers: { Authorization: `Bearer ${token}` }, }
      );
      setcartitems(response.data.cartdata);
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const i in cartitems) {
      if (cartitems[i] > 0) {
        const item = foodList.find((product) => product._id === i);
        if (item) total += cartitems[i] * item.price;
      }
    }
    return total;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        {   headers: { Authorization: `Bearer ${token}` }, }
      );
      if (response.data.success) setcartitems(response.data.cartdata);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        await fetchFoodList();
        const tokenFromStorage = localStorage.getItem("token");
        if (tokenFromStorage) {
          setToken(tokenFromStorage);
          await loadCartData(tokenFromStorage);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list: foodList,
    cartitems,
    setcartitems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
