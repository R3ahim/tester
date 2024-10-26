import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toFormData } from 'axios'
import { assets } from '../../assets/assets'
import axios from 'axios'

const Cart = () => {

  const navigate = useNavigate();
    const {cartItems,removeFromCart,getTotalCartAmount,url,cartDatas,filterData} = useContext(StoreContext);


      
      const [street, setStreet] = useState('');
      const [house, setHouse] = useState('');
      const [city, setCity] = useState('');
      const [distance, setDistance] = useState(null);
      const address1 = 'Jodłowa 11A, 83-110 Tczew, Poland'
      // const address1 = 'Jodłowa 11A, 83-110 Tczew, Poland'
    
      const apiKey = 'AlzaSy8CAJZTzcPZl3yhDq5T07T-4WD-uZE-qMY'; // Replace with your actual API key
      const fullAddress = street+','+ house + ',' + city;
    
      const calculateDistance = async () => {
        if (!address1 || !street || !house || !city) {
          alert("Please fill in all fields.");
          return;
        }
    
        // Combine street, house, and city to form the second address
        const address2 = `${house} ${street}, ${city}`;
    
        try {
          const response = await axios.get(`https://maps.gomaps.pro/maps/api/distancematrix/json`, {
            params: {
              origins: address1,
              destinations: address2,
              key: apiKey,
            },
          });
    
          const distanceData = response.data.rows[0].elements[0];
          console.log(response.data.rows[0])
          console.log(response)
          if (distanceData.status === 'OK') {
            setDistance(distanceData.distance.text);
            localStorage.setItem('destence',distanceData.distance.text)
            localStorage.setItem('locate',fullAddress)
          } else {
            alert("Unable to calculate distance.");
          }
        } catch (error) {
          console.error("Error fetching distance data", error);
        }
        navigate('/order')
      };
    
      // const handleLocateMe = () => {
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      //   } else {
      //     setError('Geolocation is not supported by this browser.');
      //   }
      // };
    
      // const successCallback = async (position) => {
      //   const { latitude, longitude } = position.coords;
        
      //   try {
      //     // Reverse geocoding to get the address from lat/lng
      //     const response = await axios.get(`https://maps.gomaps.pro/maps/api/geocode/json`, {
      //       params: {
      //         latlng: `${latitude},${longitude}`,
      //         key: apiKey,
      //       },
      //     });
      //  console.log(response.data)
      //     const addressComponents = response.data.results[0].address_components;
    
      //     // Extract street, house number, and city from the address components
      //     const street = addressComponents.find(component =>
      //       component.types.includes('route')
      //     )?.long_name || '';
          
      //     const house = addressComponents.find(component =>
      //       component.types.includes('street_number')
      //     )?.long_name || '';
          
      //     const city = addressComponents.find(component =>
      //       component.types.includes('locality')
      //     )?.long_name || '';
    
      //     setLocationData({ street, house, city });
      //   } catch (error) {
      //     setError("Failed to retrieve address from the geolocation.");
      //     console.error("Error fetching geolocation data", error);
      //   }
      // };
    
      // const errorCallback = (error) => {
      //   switch(error.code) {
      //     case error.PERMISSION_DENIED:
      //       setError("User denied the request for Geolocation.");
      //       break;
      //     case error.POSITION_UNAVAILABLE:
      //       setError("Location information is unavailable.");
      //       break;
      //     case error.TIMEOUT:
      //       setError("The request to get user location timed out.");
      //       break;
      //     case error.UNKNOWN_ERROR:
      //       setError("An unknown error occurred.");
      //       break;
      //     default:
      //       setError("An unknown error occurred.");
      //   }
      // };





   
  

  return (
    <div className="cart">
        <div className="cart-items">
            <div className="cart-items-title">
                <p>Items</p>
                <p>Title</p>
                <p>size</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <br />
            <hr />
            {filterData.map((item,index)=>{
                if(cartItems[item.itemId ]>0){
                    return(
                      <div key={item._id}>
                          <div className="cart-items-title cart-items-item">
                            <img src={url + '/images/'+item.image} alt=''/>
                            <p>{item.name}</p>
                            <p>{item.sizeId}</p>
                            <p>${item.sizePrice}</p>
                            <p>{cartItems[item.itemId]}</p>
                            <p>${item.sizePrice*cartItems[item.itemId]}</p>
                            {/* <p>$ {item.allPrice}</p> */}
                            {/* <p>$ {item.price * item}</p> */}
                            

                            <p onClick={()=>removeFromCart(item.itemId)} className='cross'>X</p>
                        </div>
                     <hr />
                      </div>
                    )
                }
            })}
        </div>
        <div className="cart-bottom">
            {/* <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>${getTotalCartAmount()===0?0:2}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount()===0?0:getTotalCartAmount(0) +2}</b>
                    </div>
                </div>
                    <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div> */}
            <div className="cart-total">
              <div className="fullfill">
                <h3>Fulfillment options</h3>
                {/* <div>
  
      
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      {locationData.street && (
        <div>
          <p><strong>Street:</strong> {locationData.street}</p>
          <p><strong>House:</strong> {locationData.house}</p>
          <p><strong>City:</strong> {locationData.city}</p>
        </div>
      )}
    </div> */}
               <div className="location">
               {/* <button className="loc-btn " onClick={handleLocateMe}>
               Locate Me <img src={assets.search_icon} alt=''/>
               </button> */}
               <div className="loc mt-4">
                 <form>
  <div className="row mb-4">
    <div className="col">
      <div data-mdb-input-init className="form-outline">
        <input   type="text" 
          value={street} 
          onChange={(e) => setStreet(e.target.value)} 
          placeholder="Enter street"  id="form3Example1" className="form-control" />
        <label className="form-label" htmlFor="form3Example1">Street<span className='text-danger'>*</span></label>
      </div>
    </div>
    <div className="col">
      <div data-mdb-input-init className="form-outline">
        <input type="text" 
          value={house} 
          onChange={(e) => setHouse(e.target.value)} 
          placeholder="Enter house number"  id="form3Example2" className="form-control" />
        <label className="form-label" htmlFor="form3Example2">House Number<span className='text-danger'>*</span></label>
      </div>
    </div>
  </div>

  <div data-mdb-input-init className="form-outline mb-4">
    <input     type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city"  id="form3Example3" className="form-control" />
    <label className="form-label" htmlFor="form3Example3">City<span className='text-danger'>*</span></label>
  </div>





  <button data-mdb-ripple-init onClick={calculateDistance} type="button" className="btn btn-primary btn-block mb-4">Find Out</button>

</form>
               </div>
               </div>
              </div>
            </div>

            <div className="cart-promocode">
                <div>
                    <p>If you have a promo code , enter it here</p>
                    <div className="cart-promocode-input">
                        <input type="text" placeholder="promo code" id="" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Cart