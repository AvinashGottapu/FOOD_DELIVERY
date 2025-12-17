import React, {useContext} from 'react'
import './menu.css'
import { menu_list } from '../../assets/assets'
import { StoreContext } from '../../context/storecontext'

const Menu = ({ category, setcategory }) => {  

  return (
    <div> 
      <div className="explore-menu" id="menu"> 
        <h1> Explore our menu </h1> 
        <p className='explore-menu-text'> 
         Discover a wide variety of dishes crafted to delight your taste buds. From savory to sweet, every meal is prepared fresh with the finest ingredients. Explore our menu and find your new favorite!
        </p> 
        <div className="explore-menu-list"> 
          {  menu_list.map((item, index) => (
            <div 
              key={index} 
              className="explore-menu-list-item"
              onClick={() => setcategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
            > 
              <img className={category === item.menu_name ? 'active' : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div> 
        <hr/>
      </div>
    </div>
  )
}

export default Menu
