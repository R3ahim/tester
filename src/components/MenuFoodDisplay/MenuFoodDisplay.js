import React, { useContext } from 'react'
import './MenuFoodDisplay.css'
import { StoreContext } from '../context/StoreContext'
import MenuFoodItem from '../MenuFoodItem/MenuFoodItem'

const MenuFoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
//    console.log(food_list)
  return (
    <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {
                food_list?.map((item,index)=>{
                    if (category==="All"||category===item.category) {
                        return<MenuFoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    }
                  
                })

            }
        </div>
    </div>
  )
}

export default MenuFoodDisplay