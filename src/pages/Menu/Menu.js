import React, { useState } from 'react'
import '../Home/Home.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import MenuFoodDisplay from '../../components/MenuFoodDisplay/MenuFoodDisplay';
import Footer from '../../components/Footer/Footer';

function Menu() {
    const [category,setcategory]= useState('All');
  console.log(category)
  return (
    <div>

<ExploreMenu category={category} setcategory={setcategory}  />
<MenuFoodDisplay category={category}/>

<Footer/>
    </div>
  )
}

export default Menu