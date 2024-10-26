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

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
    
  const [locationData, setLocationData] = useState("");
  const [error, setError] = useState('');
  const apiKey = 'AlzaSy8CAJZTzcPZl3yhDq5T07T-4WD-uZE-qMY'; // Replace with your actual API key
    
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const successCallback = async (position) => {
    const { latitude, longitude } = position.coords;
    
    try {
      // Reverse geocoding to get the address from lat/lng
      const response = await axios.get(`https://maps.gomaps.pro/maps/api/geocode/json`, {
        params: {
          latlng: `${latitude},${longitude}`,
          key: apiKey,
        },
      });
      const addressComponents = response.data.results[0].formatted_address ;
      setLocationData(addressComponents)
      console.log(addressComponents,'appdata')

      // Extract street, house number, and city from the address components
      // const street = addressComponents.find(component =>
      //   component.types.includes('route')
      // )?.long_name || '';
      
      // const house = addressComponents.find(component =>
      //   component.types.includes('street_number')
      // )?.long_name || '';
      
      // const city = addressComponents.find(component =>
      //   component.types.includes('locality')
      // )?.long_name || '';

      // setLocationData({ street, house, city });
    } catch (error) {
      setError("Failed to retrieve address from the geolocation.");
      console.error("Error fetching geolocation data", error);
    }
  };

  if(locationData){
    // const data = JSON.stringify(locationData)
    localStorage.setItem('location',locationData)
  }

  useEffect(()=>{
    handleLocateMe()
  },[])
  const errorCallback = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };




  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
   <Navbar setShowLogin={setShowLogin}/>
   <Routes>
    <Route  path='/' element={<Home/>}></Route>
    <Route  path='/cart' element={<Cart/>}></Route>
    <Route  path='/order' element={<PlaceOrder/>}></Route>
    <Route path='/verify' element={<Verify/>}/>
    <Route path='/myorders' element={<MyOrders/>}/>
    <Route path='/ordering/:id' element={<FoodDetails/>}/>
    <Route path='/delivery' element={<Delivery/>}/>
   </Routes>
    </div>
    
   
   </>
  )
}

export default App