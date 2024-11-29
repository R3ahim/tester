import React, { useContext } from 'react'
import './MenuFoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';
const MenuFoodItem = ({id,name,price,image,description}) => {

const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)
// console.log(cartItems[id])
// console.log(id)

  return (
    
    <div className="food-item1">
    <Link to={'/ordering/' +id}>
      
        <div className="food-item-info1">
            <div className="food-item-name-rating1">
                <p>{name}</p>
                <img  src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc1'>{description}</p>
            <p className="food-item-price1">PLN {price}</p>


        </div>
        <button className="buttner">Add</button>
        </Link>
    </div>
  )
}

export default MenuFoodItem