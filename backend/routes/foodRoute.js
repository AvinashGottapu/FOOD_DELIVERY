import express from 'express'
import { addFood, listfood, removefood } from '../controllers/foodcontroller.js'
import multer from 'multer'

const Router = express.Router();

const storage = multer.diskStorage({ 
    destination:'uploads', // 'uploads' is the folder where uploaded files will be saved.
    filename : (req,file,cb) => { 
        return cb(null,`${Date.now()}-${file.originalname}`)  // HOW THE FILES WILL BE NAMED WHEN SAVED.
        // cb is a callback function: first parameter is error (null if no error), second is destination path.
    }
})
const upload = multer({storage : storage});  // multer is a middleware for handling file uploads.

Router.post('/add',upload.single('image'),addFood)  
   // 'image' here is the name of the field in the form or request that will contain the file.
Router.get('/list',listfood)
Router.post('/remove',removefood);

export default Router