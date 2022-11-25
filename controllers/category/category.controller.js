const { Category } = require("../../models");


 const addCategory =async (req,res) =>{
   try{
        console.log(req.body);
        const {category,description,cat_image} = req.body;
        await Category.create({category,description,cat_image});
        res.send("data added");
   }catch(e){
    console.log("error :",e);
   }
}

module.exports =  { addCategory };