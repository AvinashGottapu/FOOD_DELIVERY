import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StoreContextProvider from './context/storecontext.jsx';
import { BrowserRouter } from 'react-router-dom'
// BrowserRouter is used so that navigation happens without refreshing the page

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
  <StoreContextProvider>
    <App />
     </StoreContextProvider>
  </BrowserRouter>
)
