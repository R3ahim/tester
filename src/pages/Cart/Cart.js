import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { json, useNavigate } from 'react-router-dom'
import { toFormData } from 'axios'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { useQuery } from 'react-query'

const Cart = () => {

  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState(null);
  const [paymentImple, setPaymentImple] = useState('Dostawa');


  const navigate = useNavigate();
    const {cartItems,removeFromCart,getTotalCartAmount,url,cartDatas,fetchCartData,filterData} = useContext(StoreContext);

    const email = localStorage.getItem('email');

        const { data: jsonData, error2, isLoading2 ,refetch } = useQuery("jsonData", fetchCartData);
        
        // const filterData =jsonData?.filter((e)=>e?.email === email);
        
        
        
        if(isLoading2){
          return <h1>Loding data . please wait</h1>
        }


      
      const address1 = 'Jodłowa 11A, 83-110 Tczew, Poland'
      // const address1 = 'Jodłowa 11A, 83-110 Tczew, Poland'
    
      const apiKey ='AlzaSyTZ_eyJWeHxBphJBh4fcoxo2oB_b7QTkvA' // Replace with your actual API key
      const fullAddress = street+','+ house + ',' + city;
    
      const TotalExtras = filterData ?.reduce((acc, item) => {
        const itemSum = item?.extra.reduce((sum, extra) => sum + (extra.price * extra.quanity), 0);
        return acc + itemSum;
      }, 0);
      const totalExraSuace = filterData?.reduce((acc, item) => {
        const itemSum = item?.extraSauce.reduce((sum, extra) => sum + (extra.price * extra.quanity), 0);
        return acc + itemSum;
      }, 0);
      
      const totalAmounts = getTotalCartAmount + totalExraSuace + TotalExtras;
      const calculateDistance = async () => {
        


        localStorage.setItem('paymentImple',paymentImple)


        if(paymentImple === 'Dostawa'){
          if(totalAmounts <30 ){
            return alert('Minimum order is 30')
          }
          
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
            localStorage.setItem('placeLocate',distanceData.distance.text)
          } else {
            alert("Unable to calculate distance.");
          }
        } catch (error) {
          console.error("Error fetching distance data", error);
        }

        }
     
        navigate('/order')
      };
    
      

      refetch();

   
  

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
            {filterData?.map((item,index)=>{
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
       
            <div className="cart-total">
              <div className="fullfill">


              <h3>Fulfillment options</h3>

              <div className="container">
      <h5>Method of implementation  </h5>

      <div
        className={`option-container ${paymentImple === 'Cash on Card' ? 'selected' : ''}`}
      >
        <input
        
          type="radio"
          id="delivers"
          value="Dostawa"
          checked={paymentImple === 'Dostawa'}
            
          onChange={()=>setPaymentImple('Dostawa')}
        />
        <label htmlFor="delivers">Dostawa</label>
      </div>

     
      <div
        className={`option-container ${paymentImple === 'Online Payment' ? 'selected' : ''}`}
      >
        <input
          type="radio"
          id="onlinePaymentImple"
          value="PickUP"
          checked={paymentImple === 'PickUP'}
          onChange={()=>setPaymentImple("PickUP")}
        />
        <label htmlFor="onlinePaymentImple">PickUP</label>
      </div>

    </div>


              {paymentImple ==='Dostawa'?  <div className="location">

<div className="loc mt-4">

  <form>
  <h5>Area of implementation  </h5>

<div className="row mb-4">
<div className="col">
<div data-mdb-input-init className="form-outline">
<input   type="text" 
value={street} 
onChange={(e) => setStreet(e.target.value)} 
placeholder="Ulica"  id="form3Example1" className="form-control" />
<label className="form-label" htmlFor="form3Example1">Ulica<span className='text-danger'>*</span></label>
</div>
</div>
<div className="col">
<div data-mdb-input-init className="form-outline">
<input type="text" 
value={house} 
onChange={(e) => setHouse(e.target.value)} 
placeholder="Numer domu"  id="form3Example2" className="form-control" />
<label className="form-label" htmlFor="form3Example2">Numer domu<span className='text-danger'>*</span></label>
</div>
</div>
</div>

<div data-mdb-input-init className="form-outline mb-4">
<input     type="text" 
value={city} 
onChange={(e) => setCity(e.target.value)} 
placeholder="Miasto"  id="form3Example3" className="form-control" />
<label className="form-label" htmlFor="form3Example3">Miasto<span className='text-danger'>*</span></label>
</div>






</form>
</div>
</div>:""}
              
<button data-mdb-ripple-init onClick={calculateDistance} type="button">Find Out</button>



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