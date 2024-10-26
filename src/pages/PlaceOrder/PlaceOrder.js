import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
const {getTotalCartAmount,token,filterData,cartItems,url}= useContext(StoreContext);
const stringDistance = localStorage.getItem('destence')
const distance  = parseInt(stringDistance)
console.log(distance)
console.log('filterData:',filterData,'cartItem:',cartItems)
const emailer = localStorage.getItem('email');const addreser = localStorage.getItem('locate')

// example
const [paymentMethod, setPaymentMethod] = useState('Online Payment');
console.log(paymentMethod)

const handlePaymentSelection = (event) => {
  setPaymentMethod(event.target.value);
};



const [data,setData]= useState({
  firstName:"",
  email:`${emailer}`,
  street:"",
  address: `${addreser}`,
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:"",
  distance:distance,
  method:paymentMethod,

})

const onChangeHandler =(event) =>{
  const name=event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
  
}

const placeOrder = async(event) =>{
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
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+price,
      deliverFee:price,

     }
     let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
     if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
      
     }
     else{
      alert(response.data.success)
     } 
    }
    const navigate = useNavigate();
    // console.log(getTotalCartAmount())
    
    useEffect(()=>{

        if (distance >10 ) {
          // console.log(token)
        navigate("/cart")
          
        }
        else if(getTotalCartAmount()===0){
          navigate('/cart')
        }
    },[token])

    const [price, setPrice] = useState(0);
  
   useEffect(()=>{
    const calculatePrice = () => {
      const dist = parseFloat(distance); // Convert distance to a number
    if(dist <=3){
      setPrice(0)
    }
      if (dist <= 5) {
        setPrice(5);
      } else if (dist > 5 && dist <= 7) {
        setPrice(8);
      } else if (dist > 7 && dist <= 10) {
        setPrice(14);
      } 
      else if (dist > 10 ) {
        setPrice(18);
      }
      else {
        setPrice('Distance out of range');
      }
    }
    calculatePrice(); 
   },[distance])
    
  


  return (
    <form  onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Your Contact Information</p>
          <div className="multi-fields">
          <label htmlFor="exampleInputEmail1">Your Name</label>
            <input required  name='firstName' className='input' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Your Name' />
            {/* <input required  name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' /> */}
          </div>
          {/* <input required  name='street' onChange={onChangeHandler} value={data.street} type="text"  placeholder='Street'/> */}
          {/* <div className="multi-fields">
            <input  required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required  name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div> */}
          {/* <div className="multi-fields">
            <input  required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
            <input required  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div> */}
         <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input  required className='input'  name='email' onChange={onChangeHandler} value={data.email} type="email"  placeholder='Email Address' id="exampleInputEmail1" aria-describedby="emailHelp" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your Phone with anyone else.</small>
  </div>
          <input required  className='input'  name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone number' />
      
          {/* apyment method */}
          <div className="container">
      <h3>Select Payment Method</h3>

      <div
        className={`option-container ${paymentMethod === 'Cash on Card' ? 'selected' : ''}`}
      >
        <input
        
          type="radio"
          id="cashOnCard"
          name="paymentMethod"
          value="Cash on Card"
        
            
          onChange={handlePaymentSelection}
        />
        <label htmlFor="cashOnCard">Cash on Card</label>
      </div>

      <div
        className={`option-container ${paymentMethod === 'Cash on Delivery' ? 'selected' : ''}`}
      >
        <input
          type="radio"
          id="cashOnDelivery"
          name="paymentMethod"
          value="Cash on Delivery"
          onChange={handlePaymentSelection}
        />
        <label htmlFor="cashOnDelivery">Cash on Delivery</label>
      </div>

      <div
        className={`option-container ${paymentMethod === 'Online Payment' ? 'selected' : ''}`}
      >
        <input
          type="radio"
          id="onlinePayment"
          name="paymentMethod"
          value="Online Payment"
          onChange={handlePaymentSelection}
        />
        <label htmlFor="onlinePayment">Online Payment</label>
      </div>

    </div>

        </div>
        <div className="place-order-right">
        <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    {/* <p>${getTotalCartAmount()===0?0:2}</p> */}
                    <p>{price}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                    <p>Extra Sauce</p>
                    {/* <p>${getTotalCartAmount()===0?0:2}</p> */}
                    <p>{price}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                    <p>Extra Meat</p>
                    {/* <p>${getTotalCartAmount()===0?0:2}</p> */}
                    <p>{price}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount()===0?0:getTotalCartAmount(0) +price}</b>
                    </div>
                </div>
                <div className="btmer">
                    <button type='submit' >PROCEED TO PAYMENT</button>
                </div>
            </div>
        </div>
    </form>


  )
}

export default PlaceOrder