import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/storecontext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setcartitems } = useContext(StoreContext);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      const token = localStorage.getItem("token");

      if (!sessionId) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:4000/api/order/verify",
          { session_id: sessionId  },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Clear cart in frontend state after successful payment
          setcartitems({});
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Verify payment error:", error);
        navigate("/");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
