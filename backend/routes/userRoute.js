import express from 'express' 
import { loginuser,registeruser } from '../controllers/usercontroller.js'


const Router = express.Router(); 

Router.post('/register',registeruser);
Router.post('/login',loginuser);

export default Router;