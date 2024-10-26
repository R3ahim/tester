import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

function Footer() {
  return (
   <div className="footer" id='footer'>
    <div className="footer-content">
        <div className="footer-content-left">
            {/* <img src={assets.logo} alt="" /> */}
            <p className="pt" style={{fontSize:'30px',fontWeight:"bolder"}}>Delta Kabab</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, velit dolore? Labore quas accusamus officiis hic animi explicabo laborum. Ab debitis id totam praesentium! Minus necessitatibus odit ullam tempore perspiciatis?</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>

        </div>
        <div className="footer-content-center">
           <h2>COMPANY</h2>
           <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delevery</li>
            <li>Pryvaci Polici</li>
           </ul>
        </div>
        <div className="footer-content-right">
         <h2>GET IN TOUCh</h2>
         <ul>
            <li>+880 1962637771</li>
            <li>itabdurrahim22@gmail.com</li>
         </ul>
        </div>
    </div>
    <hr />
    <p className="footer-copyright">Compyright 2024 c Tomto.com . All right Reserved </p>
   </div>
  )
}

export default Footer