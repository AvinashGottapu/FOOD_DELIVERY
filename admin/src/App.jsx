import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/add/add'
import List from './pages/list/list'
import Orders from './pages/orders/orders'
import PendingOrders from './pages/pending/pending'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => { 
   
   const url = 'http://localhost:4000';

  return (
    <div>  
      <ToastContainer/>
      <Navbar/> 
      <hr />    
      <div className="app-content"> 
        <Sidebar className/> 
      <Routes> 
        <Route path='/add' element = {<Add url={url}/>} />
        <Route path='/list' element = {<List url={url}/>} />
        <Route path='/orders' element = {<Orders url={url}/>} /> 
        <Route path='/pending' element = { <PendingOrders url={url}/> } />
      </Routes> </div>
    </div>
  )
}

export default App
