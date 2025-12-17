let cartData = {}; 

const addToCart = (req, res) => { 
  try {
    const itemId = req.body.ItemId;
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    res.json({
      success: true,
      message: 'Added to cart',
      cartdata: cartData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding to cart' });
  }
};

const removeFromCart = (req, res) => {
  try {
    const itemId = req.body.ItemId;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId]; // clean up empty
    }

    res.json({
      success: true,
      message: 'Removed from cart',
      cartdata: cartData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error removing from cart' });
  }
};

const getCart = (req, res) => {
  try {
    res.json({
      success: true,
      cartdata: cartData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching cart' });
  }
};

export { addToCart, removeFromCart, getCart };
