import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { assets } from '../../assets/assets';

const PlaceOrder = () => {
const {getTotalCartAmount,token,cartItems,url,fetchCartData,filterData}= useContext(StoreContext);
const addreser = localStorage.getItem('locate');
const [address,setAddress] = useState('')
const { data: jsonData, error2, isLoading2 ,refetch } = useQuery("jsonData", fetchCartData);
const [confermation,setConfermation] = useState(false)
 const [comment,setCommment] = useState('')

const date = new Date(); // current date and time

// Get the year
const year = date.getFullYear();

// Get the month (0-11, where 0 = January and 11 = December)
const month = date.getMonth() + 1; // Adding 1 to make it 1-12

// Get the day of the month (1-31)
const day = date.getDate();

const time =  `${day}/${month}/${year}`

const stringDistance = localStorage.getItem('destence')
const paymentImple = localStorage.getItem('paymentImple')
const distance  = parseInt(stringDistance)

// example
const [paymentMethod, setPaymentMethod] = useState('Cash on Card');
const [price, setPrice] = useState(0); /// delivery price

// const handlePaymentSelection = (event) => {
//   setPaymentMethod(event.target.value);
//   alert(event.target.value)
// };
let ordersrs =[];
 

     filterData.map((item)=>{
          if(cartItems[item.itemId]>0){
            let itemInfo = item;
            itemInfo['quantity'] = cartItems[item.itemId];
            ordersrs.push(itemInfo)
          
        
          }
     })
const TotalExtras = ordersrs?.reduce((acc, item) => {
  const itemSum = item?.extra.reduce((sum, extra) => sum + (extra.price * extra.quanity), 0);
  return acc + itemSum;
}, 0);
const totalExraSuace = ordersrs?.reduce((acc, item) => {
  const itemSum = item?.extraSauce.reduce((sum, extra) => sum + (extra.price * extra.quanity), 0);
  return acc + itemSum;
}, 0);



const [datas,setData]= useState({
  firstName:"",
  email:``,
  address: `${addreser}`,
  city:"",
  state:"",
  postalCode:"",
  apartment:"",
  phone:"",
  distance:distance,
  methodImple:paymentImple,
  method:paymentMethod,
  comment:comment

})

const onChangeHandler =(event) =>{
  const name=event.target.name;
  const value = event.target.value;
  setData(datas=>({...datas,[name]:value}))
  
}

const handleComment =(e) =>{

  setCommment(e.target.value); // Update the state with the user's input

}
const [showInput, setShowInput] = useState(false);

const handleButtonClick = () => {
  setShowInput((prev) => !prev); // Toggle the visibility of the input field
};
const totaAmountofCart = getTotalCartAmount() + totalExraSuace + totalExraSuace;

const placeOrder = async(event) =>{
 
setConfermation(true)
     event.preventDefault();
     let orderItems =[];
 
     
     filterData.map((item)=>{
          if(cartItems[item.itemId]>0){
            let itemInfo = item;
            itemInfo['quantity'] = cartItems[item.itemId];
            orderItems.push(itemInfo)
          
        
          }
     })
     let orderData={
      address:datas,
      items:orderItems,
      amount:getTotalCartAmount()+price + totalExraSuace + TotalExtras,
      deliverFee:price,
      method:paymentMethod,
      paymentImple:paymentImple,
      totalExraSuace:totalExraSuace,
      TotalExtras:TotalExtras,
      time:time

     }
     let response = await axios.post(url+"/api/order/post",orderData,{headers:{token}});
     if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
      
     }
     else{
      alert(response.data.success,'slsl')
     }
    console.log(orderData)
    }
  
    const navigate = useNavigate();
    // console.log(getTotalCartAmount())
    
    useEffect(()=>{

        // if (distance >10 ) {
        //   // console.log(token)
        // // navigate("/cart")
          
        // }
        if(paymentImple ==='Dostawa'){
 // ["sosnowa1", "12", "Szpęgawa", "puland"]
const address = addreser.split(",");
setAddress(address)

        }
         if(getTotalCartAmount()===0){
          navigate('/cart')
        }
       
    },[token])

  
   useEffect(()=>{
  
    const calculatePrice = () => {

      if(paymentImple ==='Dostawa'){

      const dist = parseFloat(distance); // Convert distance to a number
      if (dist >= 0 && dist <= 3) {
        if (totaAmountofCart > 50) {
          setPrice(0) ; // Free delivery for orderPrice > 50 within 0-3 km
          localStorage.setItem('setprice',0)

        } else {
          setPrice(3) // Delivery fee of 3 for orderPrice <= 50 within 0-3 km
          localStorage.setItem('setprice',3)

        }
      }
      else if (dist > 3 && dist <= 4) {
        setPrice(6) // Delivery fee of 6 for distance > 3 and <= 4 km
        localStorage.setItem('setprice',6)

      }
      else if (dist > 5 && dist <= 7) {
        setPrice(10) // Delivery fee of 10 for distance > 5 and <= 7 km
        localStorage.setItem('setprice',10)

      }  else if (dist > 7 && dist <= 9) {
        setPrice(15)// Delivery fee of 15 for distance > 7 and <= 9 km
        localStorage.setItem('setprice',15)

      }
      else if (dist === 10) {
       setPrice(20) // Delivery fee of 20 for distance exactly 10 km
      } 
      else {
        setPrice('Distance out of range');

      }
    }
    else{
      setPrice(0)
    }

    }
    calculatePrice(); 
   },[paymentImple])
    
  useEffect(()=>{
  
    if (paymentImple === 'PickUP')(
      setPrice(0)
    )
    else{
   const pr =  localStorage.getItem('setprice');
   setPrice( parseFloat(pr))
    }
  },[paymentImple])
 refetch()

//  console.log(address)

  return (
    <form  onSubmit={placeOrder} className="place-order">



        <div className="place-order-left">
     
      
          {/* Method of implementation*/}

          <div className="container">
      <h5>Method of implementation  </h5>

      <div
        className={"option-container selected"}
      >
        <input
        
          type="radio"
          id="delivers"
          value="Dostawa"
          checked
            
        />
        <label htmlFor="delivers">{paymentImple}</label>
      </div>

     
    

    </div>
          {/* apyment method */}
          <div className="container">
      <h5>Select Payment Method</h5>

      <div
        className={`option-container ${paymentMethod === 'Cash on Card' ? 'selected' : ''}`}
      >
        <input
        
          type="radio"
          id="cashOnCard"
          name="paymentMethod"
          value="Cash on Card"
          checked={paymentMethod === 'Cash on Card'}
            
          onChange={()=>setPaymentMethod('Cash on Card')}
        />
        <label htmlFor="cashOnCard">Cash on Card</label>
      </div>

      <div
        className={`option-container ${paymentMethod === 'Cash on Delivery' ? 'selected' : ''}`}
      >
        <input
          type="radio"
          id="cashOnDelivery"
          value="Cash on Delivery"
          checked={paymentMethod === "Cash on Delivery"}
          onChange={()=>setPaymentMethod('Cash on Delivery')}
        />
        <label htmlFor="cashOnDelivery">Cash on Delivery</label>
      </div>

      {/* <div
        className={`option-container ${paymentMethod === 'Online Payment' ? 'selected' : ''}`}
      > */}
        {/* <input
          type="radio"
          id="onlinePayment"
          name="paymentMethod"
          value="Online Payment"
          checked={paymentMethod === 'Online Payment'}
          onChange={()=>setPaymentMethod("Online Payment")}
        />
        <label htmlFor="onlinePayment">Online Payment</label> */}
      {/* </div> */}

    </div>

    {/* this location information */}
    {
      paymentImple ===  'Dostawa'?   
       <div >
              
      <div className="loc mt-4">
<div className="row mb-4">
<div className="col">
<div data-mdb-input-init className="form-outline">
<input   type="text" 
 value={address[0]} 
 disabled
 // onChange={(e) => setStreet(e.target.value)} 
 placeholder="Ulica"  id="form3Example1" className="form-control" />
 {/* streeet */}
<label className="form-label" htmlFor="form3Example1">Ulica<span className='text-danger'>*</span></label>
</div>
</div>
<div className="col">
<div data-mdb-input-init className="form-outline">
<input type="text" 
 value={address[1]} 
 disabled
 // onChange={(e) => setHouse(e.target.value)} 
 placeholder="Enter house number"  id="form3Example2" className="form-control" />
 {/* house number */}
<label className="form-label" htmlFor="form3Example2">Numer domu<span className='text-danger'>*</span></label>
</div>
</div>
</div>

<div data-mdb-input-init className="form-outline mb-4">
<input     type="text" 
 value={address[2]} 
 disabled
 // onChange={(e) => setCity(e.target.value)} 
 placeholder="Enter city"  id="form3Example3" className="form-control" />
<label className="form-label" htmlFor="form3Example3">Miasto<span className='text-danger'>*</span></label>
</div>
{/*city and house */}
<div className="row mb-4">
<div className="col">
<div data-mdb-input-init className="form-outline">
<input   type="text" 
 value={datas.apartment} 
 name='apartment'
 // onChange={(e) => setStreet(e.target.value)} 
 onChange={onChangeHandler}
 placeholder="Nume r mieszkania"  id="form3Example1" className="form-control" />
<label className="form-label" htmlFor="form3Example1">Nume r mieszkania:<span className='text-danger'>*</span></label>
</div>
</div>
<div className="col">
<div data-mdb-input-init className="form-outline">
<input type="text" 
 name='postalCode'
 value={datas.postalCode} 
 onChange={onChangeHandler} 
 placeholder="Poczta"  id="form3Example2" className="form-control" />
<label className="form-label" htmlFor="form3Example2">Poczta <span className='text-danger'>*</span></label>
</div>
</div>
</div>






      </div>
      </div> :""
    }
  <div style={{display:"flex",}}>
  <button onClick={handleButtonClick} className='comment_bnt'>
        {showInput ? '-' : 'komentarz'}
      </button>
      {showInput && (
        <div style={{ marginTop: '20px' }}>
          <input
          onChange={handleComment}
            type="text"
            className='form-control'
            placeholder="Wpisz swój komentarz dotyczący dostawy"
            id='form3Example3'
            
          />
        </div>
      )}
  </div>
     


    {/* contact information */}

<div className="location">
  <h4 className='m-4 '> Contact Information</h4>
<div data-mdb-input-init className="form-outline mb-4">
  <label className="form-label" htmlFor="form3Example3">Twoje imię  <span className='text-danger'>*</span></label>
    <input     type="text"
    name='firstName'
          value={datas.firstName} 
          required
          onChange={onChangeHandler} 
          placeholder="Twoje imie"  id="form3Example3" className="form-control" />
  </div>
<div data-mdb-input-init className="form-outline mb-4">
  <label className="form-label" htmlFor="form3Example3">Telefon<span className='text-danger'>*</span></label>
    <input     type="text" 
    name='phone'
          value={datas.phone} 
          required
          onChange={onChangeHandler} 
          placeholder="Telefon"  id="form3Example3" className="form-control" />
  </div>
<div data-mdb-input-init className="form-outline mb-4">
  <label className="form-label" htmlFor="form3Example3">adres e-mail  <span className='text-danger'></span></label>
    <input     type="text"
    name='email' 
          value={datas.email} 
          onChange={onChangeHandler} 
          
          placeholder="adres e-mail "  id="form3Example3" className="form-control" />
  </div>

</div>
  


        </div>
        <div className="place-order-right">
        <div className="cart-total">
                <h2>Sumy koszyka  </h2>
                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>PLN{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                    <p>Dostawa Fee</p>
                    {/* <p>${getTotalCartAmount()===0?0:2}</p> */}
                    <p>PLn {price}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                    <p>Extra Sauce</p>
                    {/* <p>${getTotalCartAmount()===0?0:2}</p> */}
                    <p>PLN {totalExraSuace}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                    <p>Extra Meat</p>
                    {/* <p>${getTotalCartAmount()===0?0:2}</p> */}
                    <p>PLN {TotalExtras}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>PLN{getTotalCartAmount()===0?0:getTotalCartAmount(0) +price + totalExraSuace + TotalExtras}</b>
                    </div>
                </div>
             
                <div className="btmer">
                <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By containing, i agree to the terms of use and privacy policy</p>
            </div>
                    <button type='submit' >PROCEED TO PAYMENT</button>
                 
                </div>
            </div>
        </div>
    </form>


  )
}

export default PlaceOrder