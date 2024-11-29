import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';
const FoodItem = ({id,name,price,image,description}) => {

const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)
// console.log(cartItems[id])
// console.log(id)

  return (
    
    <div className="food-item">
    <Link to={'/ordering/' +id}>
        <div className="food-item-img-container">
            <img src={url + "/images/" + image} alt="" className="food-item-image" />
            {/* { !cartItems[id]
             ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
             : <div  className="food-item-counter">
              <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
      <img  onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" /> 
             </div>
                
            } */}
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img onClick={()=>localStorage.setItem('as',JSON.stringify([{}]))} src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className="food-item-price">PLN {price}</p>
        </div>
        </Link>
    </div>
  )
}

export default FoodItem