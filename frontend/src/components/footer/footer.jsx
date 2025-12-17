import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const footer = () => {  
  return (
    <div className='footer' id='contact'>
      <div className="footer-content"> 
        <div className="footer-content-left"> 
            <img src={assets.logo} alt="" /> 
            <p> Serving delicious meals made with fresh ingredients every day. Committed to fast, friendly service and a memorable dining experience. Join us and taste the difference in every bite. </p>
            <div className="footer-social-icons"> 
               <img src={assets.facebook_icon} alt="" />                 
               <img src={assets.twitter_icon} alt="" />
               <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
                 <h2> COMPANY </h2> 
                 <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                 </ul>
         </div>
        <div className="footer-content-right"> 
            <h2> GET IN TOUCH </h2> 
            <li> +91-212-254-2680 </li>
            <li> contact@tomato.com </li>
        </div>
      </div> 
           <hr />
           <p className="footer-copyright"> 
             Copyright 2025 © Tomato.com. All rights reserved.
           </p>
    </div>
  )
}

export default footer
