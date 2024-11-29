import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar.js'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.js'
import Cart from './pages/Cart/Cart.js'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.js'
import Footer from './components/Footer/Footer.js'
import LoginPopup from './components/LoginPopup/LoginPopup.js'
import Verify from './pages/Verify/Verify.js'
import MyOrders from './pages/MyOrders/MyOrders.js'
import FoodDetails from './components/FoodDetails/FoodDetails.js'
import Delivery from './pages/Delivery/Delivery.js'
import axios from 'axios'
import Contact from './pages/Contact/Contact.js'
import Menu from './pages/Menu/Menu.js'
import LoginForm from './components/LoginPopup/LoginForm.js'
import CollectionDetails from './components/CollectionDetails/CollectionDetails.js'



const App = () => {
  const [showLogin,setShowLogin] = useState(false)
    




  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
   <Navbar setShowLogin={setShowLogin}/>
   <Routes>
    <Route  path='/' element={<Home/>}></Route>
    <Route  path='/cart' element={<Cart />}></Route>
    <Route path='/menu' element={<Menu/>}/>
    <Route path='/order' element={<PlaceOrder />}></Route>
    <Route path='/verify' element={<Verify/>}/>
    <Route path='/myorders' element={<MyOrders/>}/>
    <Route path='/ordering/:id' element={<FoodDetails setShowLogin={setShowLogin}/>}/>
    <Route path='/delivery' element={<Delivery/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/login'element={<LoginForm/>}/>
    <Route path='/collection/:id' element={<CollectionDetails />}/>

   </Routes>
    </div>
    
   
   </>
  )
}

export default App