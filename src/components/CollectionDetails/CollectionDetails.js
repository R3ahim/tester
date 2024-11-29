import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { food_list } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const CollectionDetails = () => {
    const {id} = useParams();
    const {food_list} = useContext(StoreContext)

    const category = id;


  return (
    <div className='colDetailsContainer'>
     <h1>  {category}</h1>
     <div className="food-display-list">

    {
                food_list?.map((item,index)=>{
                    if (category===item.category) {
                        return<FoodItem  key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    }
                  
                })

            }
            </div>
             </div>
  )
}

export default CollectionDetails