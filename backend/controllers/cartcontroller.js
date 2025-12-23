import usermodel from "../models/usermodel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const itemId = req.body.ItemId;
    const user = await usermodel.findById(userId);

    // Update the local object
    user.cartdata[itemId] = (user.cartdata[itemId] || 0) + 1;
    
    await user.save();  

    res.json({
      success: true,
      message: "Added to cart",
      cartdata: user.cartdata
    });   
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const itemId = req.body.ItemId; 
    const user = await usermodel.findById(userId);

    if (user.cartdata[itemId] > 0) {
      user.cartdata[itemId] -= 1;
      if (user.cartdata[itemId] === 0) delete user.cartdata[itemId];
      await user.save();
    }

    res.json({ success: true, cartdata: user.cartdata });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await usermodel.findById(req.userId); 
    res.json({
      success: true,
      cartdata: user.cartdata || {}
    }); 
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export { addToCart, removeFromCart, getCart };