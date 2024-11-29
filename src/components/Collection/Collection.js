import React from 'react'
import { Link } from 'react-router-dom'
import './Collection.css'
import { menu_list } from '../../assets/assets'
import { food_list } from '../../assets/assets'

const Collection = () => {
    
    
  return (
    <div>
        <h3>Collections</h3>

        <div className="collection_contianer">
            
        {
        menu_list.map((item,index)=>{return    <div className="collection_header" >
                     <Link to={`collection/${item.menu_name}`}>

            <img src={item.image} alt="" />
             <div className="texts">
               <li>{item.menu_name}</li>
                <span ><svg viewBox="0 0 14 10" fill="none" aria-hidden="true" focusable="false" class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor"> </path></svg></span>
             </div>
             </Link>

        </div>})

        }
        
        </div>


    </div>
  )
}

export default Collection