import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'
import Collection from '../../components/Collection/Collection'

const Home = () => {
    const [category,setcategory]= useState('All');

    console.log(category)
  return (
    <div>
        <Header/>
        {/* <ExploreMenu category={category} setcategory={setcategory}  /> */}
        {/* <FoodDisplay category={category}/> */}
        <Collection/>
        <Footer/>

    </div>
  )
}

export default Home