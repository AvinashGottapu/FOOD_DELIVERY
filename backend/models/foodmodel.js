import mongoose, { model } from "mongoose";

const foodschema = new mongoose.Schema({ 
    name : { type:String, requried:true },
    description : { type:String, requried:true },
    price : { type:Number, requried:true },
    image : { type:String, requried:true },
    category : { type:String, requried : true }
})

const foodmodel =  mongoose.models.food || mongoose.model('food',foodschema) 
 // This makes your code safe for multiple executions.

 export default foodmodel