import React , {useContext, useState} from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'

const Loginpopup = ({setshowlogin}) => {   
     const { url , setToken } = useContext(StoreContext)  

     const [currstate,setcurrstate] = useState("Login")

     const [data,setdata] = useState({ 
       name:"",
       email:"",
       password : "",
     }) 

      const onchangehandler = (e) => { 
             const name = e.target.name;
             const value = e.target.value;
             setdata({...data,[name]:value});
      } 

      const onLogin = async (event) => { 
           event.preventDefault(); 
           let newurl = url; 
           if(currstate=='Login') { 
                newurl += '/api/user/login' 
           } 
           else { 
              newurl += '/api/user/register'
           } 
            const response = await axios.post(newurl,data); 

            if(response.data.success) { 
               setToken(response.data.token); 
               localStorage.setItem('token',response.data.token);
               setshowlogin(false);
            } 
            else { 
              alert(response.data.message);
            }
      }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">  
            <div className="login-popup-title"> 
                   <h2> {currstate} </h2> 
                   <img onClick={ () => setshowlogin(false) } src={assets.cross_icon} alt="" /> 
              </div>  
              <div className="login-popup-inputs"> 
                { currstate==='Sign Up' ? <input name='name' value={data.name} onChange={onchangehandler} type='text' placeholder='Youe Name' required /> : <> </> }   
                  
                  {/* The text shown in this input box should always come from data.name. 
                      value => data. and data in state are different.. */}

                <input name='email' value={data.email} onChange={onchangehandler}  type='email' placeholder='Your Email' required />
                <input name='password' value={data.password} onChange={onchangehandler}  type='password' placeholder='Password' required />
               </div> 
               <button type='submit'> { currstate==='Sign Up' ? 'Create Account' : 'Login' }  </button> 
               <div className="login-popup-condition"> 
                  <input type='checkbox' required /> 
                  <p> By, continuing, i agree  to the terms of use & privacy policy. </p>
               </div>
                { currstate==='Login'
                  ? <p> Create a new account? <span onClick={ () => setcurrstate('Sign Up') }> Click here </span> </p>
                  : <p> Already have an account? <span onClick={ () => setcurrstate('Login') }> Login here </span> </p>
                }

             
         </form>
    </div>
  )
}

export default Loginpopup
