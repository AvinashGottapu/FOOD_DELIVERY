import React, { useState } from 'react';
import Navbar from './components/navbar/navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';
import Placeorder from './pages/placeorder/placeorder';
import Verify from './pages/verify/verify'
import Myorders from './pages/Myorders/Myorders';
import Footer from './components/footer/footer';
import Loginpopup from './components/Loginpopup/Loginpopup';

const App = () => {
  const [showlogin, setshowlogin] = useState(false);

  return (
    <>
      {showlogin && <Loginpopup setshowlogin={setshowlogin} />}

      <div className='app'>
        <Navbar setshowlogin={setshowlogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element = { <Myorders/> } />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
