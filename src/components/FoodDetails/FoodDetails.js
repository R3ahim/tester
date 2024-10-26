import React, { useContext, useEffect, useState } from 'react'
import './FoodDetails.css'
import { json, Link, useNavigate, useParams } from 'react-router-dom'
import { assets,sauceOrder,moreExtra } from '../../assets/assets';
import backButton from '../../components/Navbar/back_button.png'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

function FoodDetails() {
  const [cartDetail,setCartDetails] = useState({}); 
  const {url,addToCart,cartItems,removeFromCart,addToCartBtn} = useContext(StoreContext)
  const navigate = useNavigate();
// console.log(cartDetail)
    const {id} = useParams();
    // somthing   
     const [addToCarts,setAddTocarts] = useState(1);
     const [datas,setDatas] = useState()
// first extras will show in here
const [extra1,setExtra1] = useState({price:6,quanity:0,name:'Addition meat 80g '})
const [extra2,setExtra2] = useState({price:3,quanity:0,name:'Extra Cheese'});
const [extra3,setExtra3] = useState({price:3,quanity:0,name:'Fata Cheese'});
const [extra4,setExtra4] = useState({price:3,quanity:0,name:'Black Olives'});
const [extra5,setExtra5] = useState({price:3,quanity:0,name:'Green Olives'});
const [extra6,setExtra6] = useState({price:3,quanity:0,name:'Jalapeno Olives'});
//second extra sauce function will work here
const [sauce1,setSauce1] = useState({price:2,quanity:0,name:'garlic sauce'})
const [sauce2,setSauce2] = useState({price:2,quanity:0,name:'Mild sauce'});
const [sauce3,setSauce3] = useState({price:2,quanity:0,name:'ketchup'});
const [sauce4,setSauce4] = useState({price:2,quanity:0,name:'Hot sauce'});
const [sauce5,setSauce5] = useState({price:2,quanity:0,name:'BBQ sauce'});
const [sauce6,setSauce6] = useState({price:2,quanity:0,name:'dill sauce'});




    const [selectedId, setSelectedId] = useState(null);
    // console.log(cartDetail)
    const [selectedMeat, setMeatvalue] = useState('');
    // after this somthing is missing
    const [selectedSauce, setSauceValue] = useState('');
    // console.log(cartDetail)



    const url1 = url +'/api/food/fooddetails/' +id;
    const getDetailsCart = async()=>{
       const response = await axios.get( url1);
      //  console.log(response.data.data)
       if(response.data.success){
         setCartDetails(response.data.data);
  
 
       }
 
       else{
          
 }
     }
    //  console.log(selectedId)j




   

   
  
    const selectedItem = cartDetail?.sizes?.find(item => item.id === selectedId);
//  console.log(cartDetail)

    const extrasPrice = extra1.quanity *extra1.price + extra2.quanity *extra2.price+extra3.quanity *extra3.price+extra4.quanity *extra4.price+extra5.quanity *extra5.price+extra6.quanity *extra6.price;
    const saucePrice = sauce1.quanity *sauce1.price + sauce2.quanity *sauce2.price+sauce3.quanity *sauce3.price+sauce4.quanity *sauce4.price+sauce5.quanity *sauce5.price+sauce6.quanity *sauce6.price;
   
    const price = (selectedItem?.price * cartItems[cartDetail._id]) + extrasPrice +saucePrice;
    // const price = 29;
//   name:cartDetail?.name,
// _id:cartDetail._id,
// quantity:cartItems[cartDetail._id],
// itemId:cartDetail?._id,
// price:cartDetail?.price,
// image:cartDetail?.image,
// size:selectedItem,
// meat:selectedMeat,
// sauce:selectedSauce,
// allPrice:price,
// extra:[extra1,extra2,extra3,extra4,extra5,extra6],
// sacues:[sauce1,sauce2,sauce3,sauce4,sauce5,sauce6]    
const email = localStorage.getItem('email');
const extras = [
  extra1,
  extra2,extra3,extra4,extra5,extra6,
  
];
const extraSauce =[sauce1,sauce2,sauce3,sauce4,sauce5,sauce6]
    const data = {
      itemId:cartDetail._id,
      email:email,
      name:cartDetail.name,
      sizeId :selectedId,
      image:cartDetail.image,
      sizePrice : selectedItem?.price,
      meatId:selectedMeat,
      sauceId:selectedSauce,
      extra:extras,
      extraSauce:extraSauce,
 

      
    
    }
    

    // console.log(data)




   


  // size radio funciton
 
  const handleMeatChange = event => {
    setMeatvalue(event.target.value);
  };
  const handleSuceChange = event => {
    setSauceValue(event.target.value);
  };

  const handleExrtraPlus = () =>{
    const quant = addToCarts + 1
    setAddTocarts(quant)
    
      
  }
  const handleExrtraMinus = () =>{
    const quantMinus = addToCarts;
    if(quantMinus>1){
      setAddTocarts(quantMinus - 1)
    }
    
      
  }

  //  all suace from increasing
  // number1
  const handleInExtra1 =()=>{
    const quant = extra1.quanity +1
    const data = {name:extra1.name,quanity:quant,price:extra1.price}
    // const data ={quanity:quant}
    setExtra1(data)
  }
  const handleDecExtra1 = ()=>{
     if(extra1.quanity>0){
      const quant = extra1.quanity -1
  const data = {name:extra1.name,quanity:quant,price:extra1.price}
  setExtra1(data)


     }
  }
  // number2
  const handleInExtra2 =()=>{
    const quant = extra2.quanity +1
    const data = {name:extra2.name,quanity:quant,price:extra2.price}
    // const data ={quanity:quant}
    setExtra2(data)
  }
  const handleDecExtra2 = ()=>{
     if(extra2.quanity>0){
      const quant = extra2.quanity -1
  const data = {name:extra2.name,quanity:quant,price:extra2.price}
  setExtra2(data)


     }
  }
  // number3
  const handleInExtra3 =()=>{
    const quant = extra3.quanity +1
    const data = {name:extra3.name,quanity:quant,price:extra3.price}
    // const data ={quanity:quant}
    setExtra3(data)
  }
  const handleDecExtra3 = ()=>{
     if(extra3.quanity>0){
      const quant = extra3.quanity -1
  const data = {name:extra3.name,quanity:quant,price:extra3.price}
  setExtra3(data)


     }
  }
  // number4
  const handleInExtra4 =()=>{
    const quant = extra4.quanity +1
    const data = {name:extra4.name,quanity:quant,price:extra4.price}
    // const data ={quanity:quant}
    setExtra4(data)
  }
  const handleDecExtra4 = ()=>{
     if(extra4.quanity>0){
      const quant = extra4.quanity -1
  const data = {name:extra4.name,quanity:quant,price:extra4.price}
  setExtra4(data)


     }
  }
  // number1
  const handleInExtra5 =()=>{
    const quant = extra5.quanity +1
    const data = {name:extra5.name,quanity:quant,price:extra5.price}
    // const data ={quanity:quant}
    setExtra5(data)
  }
  const handleDecExtra5 = ()=>{
     if(extra5.quanity>0){
      const quant = extra5.quanity -1
  const data = {name:extra5.name,quanity:quant,price:extra5.price}
  setExtra5(data)


     }
  }
  // number1
  const handleInExtra6 =()=>{
    const quant = extra6.quanity +1
    const data = {name:extra6.name,quanity:quant,price:extra6.price}
    // const data ={quanity:quant}
    setExtra6(data)
  }
  const handleDecExtra6 = ()=>{
     if(extra6.quanity>0){
      const quant = extra6.quanity -1
  const data = {name:extra6.name,quanity:quant,price:extra6.price}
  setExtra6(data)


     }
  }


  // extra suace funtion will here
  // sauce 1
  const hanldeInSauce1 =()=>{
    const quant = sauce1.quanity +1
    const data = {name:sauce1.name,quanity:quant,price:sauce1.price}
    // const data ={quanity:quant}
    setSauce1(data)
  }
  const handleDecSauce1 = ()=>{
     if(sauce1.quanity>0){
      const quant = sauce1.quanity -1
  const data = {name:sauce1.name,quanity:quant,price:sauce1.price}
  setSauce1(data)


     }
  }
  const hanldeInSauce2 =()=>{
    const quant = sauce2.quanity +1
    const data = {name:sauce2.name,quanity:quant,price:sauce2.price}
    // const data ={quanity:quant}
    setSauce2(data)
  }
  const handleDecSauce2 = ()=>{
     if(sauce2.quanity>0){
      const quant = sauce2.quanity -1
  const data = {name:sauce2.name,quanity:quant,price:sauce2.price}
  setSauce2(data)


     }
  }
  const hanldeInSauce3=()=>{
    const quant = sauce3.quanity +1
    const data = {name:sauce3.name,quanity:quant,price:sauce3.price}
    // const data ={quanity:quant}
    setSauce3(data)
  }
  const handleDecSauce3 = ()=>{
     if(sauce3.quanity>0){
      const quant = sauce3.quanity -1
  const data = {name:sauce3.name,quanity:quant,price:sauce3.price}
  setExtra3(data)


     }
  }
  const hanldeInSauce4 =()=>{
    const quant = sauce4.quanity +1
    const data = {name:sauce4.name,quanity:quant,price:sauce4.price}
    // const data ={quanity:quant}
    setSauce4(data)
  }
  const handleDecSauce4 = ()=>{
     if(sauce4.quanity>0){
      const quant = sauce4.quanity -1
  const data = {name:sauce4.name,quanity:quant,price:sauce4.price}
  setSauce4(data)


     }
  }
  const hanldeInSauce5 =()=>{
    const quant = sauce5.quanity +1
    const data = {name:sauce5.name,quanity:quant,price:sauce5.price}
    // const data ={quanity:quant}
    setSauce5(data)
  }
  const handleDecSauce5 = ()=>{
     if(sauce5.quanity>0){
      const quant = sauce5.quanity -1
  const data = {name:sauce5.name,quanity:quant,price:sauce5.price}
  setSauce5(data)


     }
  }
  const hanldeInSauce6=()=>{
    const quant = sauce6.quanity +1
    const data = {name:sauce6.name,quanity:quant,price:sauce6.price}
    // const data ={quanity:quant}
    setSauce6(data)
  }
  const handleDecSauce6= ()=>{
     if(sauce6.quanity>0){
      const quant = sauce6.quanity -1
  const data = {name:sauce6.name,quanity:quant,price:sauce6.price}
  setSauce6(data)


     }
  }
  useEffect(()=>{
    getDetailsCart();

  },[])
// console.log(datas)
  const handleSubmit = ()=>{

    
      setDatas(prevData => [...prevData, data]);
    // setDatas(data,'datas')








    // localStorage.setItem("as",JSON.stringify(datas));

    }

    


// console.log(selectedItem)

    // console.log(`${url}/images/${cartDetail?.image}`)
  return (
   <div>
     <div className="header-bottom">

           
<div className="bottom-btn">
 <div className="food-item-counter-plus">
 
   <img  onClick={()=>removeFromCart(cartDetail._id)}  src={assets.remove_icon_red} alt="" />
   <p>{cartItems[cartDetail._id]}</p>
 <img  onClick={()=>addToCart(cartDetail._id,data)}  src={assets.add_icon_green} alt="" /> 
  </div>
 
 <button  onClick={()=>addToCartBtn(data)}className='btm-btn'>
   Add To Cart
 </button>
</div>
</div>
     <div className="food-item">
        <div className="food-item-img-container">
            <img src={`${url}/images/${cartDetail?.image}`} alt="" className="food-item-image" />
              <div  className="food-item-counter">
             
             </div>
             <div className="back_btn">
      <Link to={'/'}><img src={backButton} alt="" />
      </Link>
             </div>
                
            
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating flex ">
                <p onClick={handleSubmit}>{cartDetail?.name}</p>
                <Link to={'/ordering/' +id}>PLN {price}</Link>
            </div>
            <hr  className='hr'/>
           <div className="radio-container">
            <div className="radio-title">
                <div className="chose">
                   <p>Choose Your Size</p>
                   <span>Select</span>
                </div>
                <span className='radio-req'>1Required</span>
            </div>
          
            <div className="radio-select">
          {/* for radio  */}
        
{
  cartDetail?.sizes?.map((size)=>{
   return <div  className="form-check radio-bar" key={size.id}>
       <div>
 <input className="form-check-input" 
 type="radio"
 id={size.id}
 name="item"
 value={size.id}
 onChange={() => setSelectedId(size.id)}
 required
 
 />
  <label className="form-check-label" htmlFor="flexRadioDefault1">
  {size.size}
  </label>
 </div>
 <p className="radio-money">
    PLN{size.price}
</p>

    </div>
    })
}
     


            </div>
            

           </div>
           <hr  className='hr'/>
           {/* the comment box */}
           <div className="radio-container mt-5">
            <div className="radio-title">
                <div className="chose">
                   <p>Type Of Meat</p>
                   <span>Select</span>
                </div>
                <span className='radio-req'>1 Required</span>
            </div>
          
            <div className="radio-select">
          {/* for radio  */}
          {
  cartDetail?.meats?.map((meat)=>{
   return <div  className="form-check radio-bar" key={meat.id}>
       <div>

       <input className="form-check-input" 
 type="radio" 
 name='meat'
  value={meat.name}
  checked={selectedMeat === meat.name}
  onChange={handleMeatChange}
  required
 
 />
  <label className="form-check-label" htmlFor="flexRadioDefault1">
  {meat.name}
  </label>
 </div>
 <p className="radio-money">
    PLN{meat.price}
</p>

    </div>
    })
}
            </div>

           </div>

           {/* for boy together */}
           <hr  className='hr'/>
           {/* the comment box */}
           <div className="radio-container mt-5">
            <div className="radio-title">
                <div className="chose">
                   <p>Sauce of your choice</p>
                   <span>Select</span>
                </div>
                <span className='radio-req'>Required</span>
            </div>
          
            <div className="radio-select">
          {/* for radio  */}
          {
  cartDetail?.sauces?.map((sauce)=>{
   return <div  className="form-check radio-bar" key={sauce.id}>
       <div>

       <input className="form-check-input" 
 type="radio" 
 name='suace'
  value={sauce.name}
  checked={selectedSauce === sauce.name}
  onChange={handleSuceChange}
  required
 
 />  <label className="form-check-label" htmlFor="flexRadioDefault1">
  {sauce.name}
  </label>
 </div>
 <p className="radio-money">
    PLN{sauce.price}
</p>

    </div>
    })
}

     

            </div>

           </div>
           <hr  className='hr'/>
           {/* the comment box */}
           <div className="radio-container mb-5">
            <div className="radio-title">
                <div className="chose">
                   <p>Extras</p>
                   <span>For you Want</span>
                </div>
                <span className='radio-req'>Optional</span>
            </div>
      
            {/* start red tell here for first one */}
                <div  className="red-tell">
              <div className="food-item-counter-plus">
                  <button onClick={handleDecExtra1}   className='btner hover'>-</button> 
                  <p>{extra1.quanity}</p>
                  <button onClick={handleInExtra1} className='btner hover'>+</button></div>
             <p>{extra1.name} {extra1.price} PLN</p>
                  </div>
      
            {/* start red tell here for first one */}
                <div  className="red-tell">
              <div className="food-item-counter-plus">
              <button onClick={handleDecExtra2}   className='btner hover'>-</button> 
                  <p>{extra2.quanity}</p>
                  <button onClick={handleInExtra2} className='btner hover'>+</button></div>
             <p>{extra2.name}  {extra2.price} PLN</p>
                  </div>
      
            {/* start red tell here for first one */}
                <div  className="red-tell">
              <div className="food-item-counter-plus">
              <button onClick={handleDecExtra3}   className='btner hover'>-</button> 
                  <p>{extra3.quanity}</p>
                  <button onClick={handleInExtra3} className='btner hover'>+</button></div>
             <p>{extra3.name} {extra3.price} PLN</p>
                  </div>
      
            {/* start red tell here for first one */}
                <div  className="red-tell">
              <div className="food-item-counter-plus">
              <button onClick={handleDecExtra4}   className='btner hover'>-</button> 
                  <p>{extra4.quanity}</p>
                  <button onClick={handleInExtra4} className='btner hover'>+</button></div>
             <p>{extra4.name}  {extra4.price} PLN</p>
                  </div>
      
            {/* start red tell here for first one */}
                <div  className="red-tell">
              <div className="food-item-counter-plus">
              <button onClick={handleDecExtra5}   className='btner hover'>-</button> 
                  <p>{extra5.quanity}</p>
                  <button onClick={handleInExtra5} className='btner hover'>+</button></div>
             <p>{extra5.name}  {extra5.price} PLN</p>
                  </div>
            {/* start red tell here for first one */}
                <div  className="red-tell">
              <div className="food-item-counter-plus">
                  <button onClick={handleDecExtra6}   className='btner hover'>-</button> 
                  <p>{extra6.quanity}</p>
                  <button onClick={handleInExtra6} className='btner hover'>+</button></div>
             <p>{extra6.name}  {extra6.price} PLN</p>
                  </div>
              
          </div>

          {/* this is another Exta suase */}
          <div className="radio-container mb-5">
            <div className="radio-title">
                <div className="chose">
                   <p>Extra sauce</p>
                   <span>count</span>
                </div>
                <span className='radio-req'>Optional</span>
            </div>
            {/* extra sacue will appear in here */}
          <div className="red-tell" >     
                <div className="food-item-counter-plus">
           <button  onClick={handleDecSauce1} className='btner hover'>-</button> 
                   <p>{sauce1.quanity}</p>
          <button onClick={hanldeInSauce1}  className='btner hover'>+</button>
       </div>
              
     <p>{sauce1.name} PLN  {sauce1.price} </p>
    
                </div>
            {/* extra sacue will appear in here */}
          <div className="red-tell" >     
                <div className="food-item-counter-plus">
           <button  onClick={handleDecSauce2} className='btner hover'>-</button> 
                   <p>{sauce2.quanity}</p>
          <button onClick={hanldeInSauce2}  className='btner hover'>+</button>
       </div>
              
     <p>{sauce2.name} PLN  {sauce2.price} </p>
    
                </div>
            {/* extra sacue will appear in here */}
          <div className="red-tell" >     
                <div className="food-item-counter-plus">
           <button  onClick={handleDecSauce3} className='btner hover'>-</button> 
                   <p>{sauce3.quanity}</p>
          <button onClick={hanldeInSauce3}  className='btner hover'>+</button>
       </div>
              
     <p>{sauce3.name} PLN  {sauce3.price} </p>
    
                </div>
            {/* extra sacue will appear in here */}
          <div className="red-tell" >     
                <div className="food-item-counter-plus">
           <button  onClick={handleDecSauce4} className='btner hover'>-</button> 
                   <p>{sauce4.quanity}</p>
          <button onClick={hanldeInSauce4}  className='btner hover'>+</button>
       </div>
              
     <p>{sauce4.name} PLN  {sauce4.price} </p>
    
                </div>
            {/* extra sacue will appear in here */}
          <div className="red-tell" >     
                <div className="food-item-counter-plus">
           <button  onClick={handleDecSauce5} className='btner hover'>-</button> 
                   <p>{sauce5.quanity}</p>
          <button onClick={hanldeInSauce5}  className='btner hover'>+</button>
       </div>
              
     <p>{sauce5.name} PLN  {sauce5.price} </p>
    
                </div>
            {/* extra sacue will appear in here */}
          <div className="red-tell" >     
                <div className="food-item-counter-plus">
           <button  onClick={handleDecSauce6} className='btner hover'>-</button> 
                   <p>{sauce6.quanity}</p>
          <button onClick={hanldeInSauce6}  className='btner hover'>+</button>
       </div>
              
     <p>{sauce6.name} PLN  {sauce6.price} </p>
    
                </div>
           
          </div>
        </div>

    </div>
   </div>
  )

}

export default FoodDetails