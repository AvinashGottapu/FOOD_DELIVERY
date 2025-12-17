import React, {useState} from 'react'
import './home.css'
import Header from '../../components/header/header'
import Menu from '../../components/explore-menu/menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Appdownload from '../../components/AppDownload/appdownload'

const home = () => { 
    const [category,setcategory] = useState('All'); 


  return (
    <div>
      <Header/> 
      <Menu category={category} setcategory={setcategory}/> 
      <FoodDisplay category={category}/> 
      <Appdownload/>
    </div>
  )
}

export default home
