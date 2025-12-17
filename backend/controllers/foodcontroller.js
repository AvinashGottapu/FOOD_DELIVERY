import { error } from "console";
import foodmodel from "../models/foodmodel.js";
import fs from 'fs'


// ADD FOOD ITEM
const addFood = async (req, res) => { 
     let image_filename = `${req.file.filename}` 
     const food = new foodmodel({ 
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,   
        category:req.body.category, 
        image:image_filename
     })  // This only creates a JavaScript object in memory.  At this point, nothing is stored in your database. 
          
     try { 
        await food.save();  // Now the document is actually inserted into MongoDB. 
        // NOTE => foodmodel.create ==> Instead of new foodmodel(...) + save()
        res.json({success:true,message:'Food Added'})
     } 
     catch (error) { 
         console.log(error);
         res.json({success:false,message:'Error'})
     }
}

// All Food List
const listfood =  async (req, res) => { 
       try { 
            const foods = await foodmodel.find({}); 
            res.json({success:true,data:foods}); 
            // NOTE : TO GET THAT DATA IN FRONTEND.
            // const response = await fetch('http://localhost:4000/api/food/list');
            // const result = await response.json();
          } 
       catch (error) { 
              console.log('List Food ERROR');
              res.json({success:false,message:error});
       }
}

// REMOVE FOOD ITEM
const removefood = async (req,res) => { 
    try { 
        const food = await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})  // deletes a file at the given path. To clean up unused images
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log("Remove Food ERROR");
        res.json({success:false,message:error});
    }
}


export { addFood,listfood,removefood }
