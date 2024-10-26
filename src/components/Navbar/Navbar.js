import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState('menu');
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext)
  
  const navigate = useNavigate()
  
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
   navigate("/")

   }
  return (
    <div className='navbar'>
     <Link to={'/'}><p className='pt'>DELTA KABAB</p></Link>
     <ul className='navbar-menu'>
      <li  onClick={()=>{setMenu("home")}} className={menu==="home"?"active":""}>Home</li>
      <li  onClick={()=>{setMenu("menu")}}  className={menu==="menu"?"active":""}>Menu</li>
      <li onClick={()=>{setMenu("Delivery")}} className={menu==="Delivery"?"active":""}><Link to={'/delivery'}>Delivery</Link></li>
      <li onClick={()=>{setMenu("contact-us")}} className={menu==="contact-us"?"active":""}>Contact us</li>
     </ul>
     <div className="navbar-right">
      <img  className='ser' src={assets.search_icon} alt="" />
      <div className="navbar-search-icon">
       <Link to={'/cart'}> <img src={assets.basket_icon} alt=""  /></Link>
        <div className={getTotalCartAmount()===0?"" :"dot"}></div>
      </div>
     {!token?<button onClick={()=>setShowLogin(true)}>signIn</button>
     :<div className='navbar-profile'>
      <img src={assets.profile_icon} alt="" />
      <ul className="nav-profile-dropdown">
         <Link to={'/myorders'}>        <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
        <hr />
        <li onClick={logout}><img src={assets.logout_icon} alt="" /> <p>Log Out</p></li>
        <hr />
      </ul>
      
      </div>}
     </div>
    </div>
  )
}

export default Navbar