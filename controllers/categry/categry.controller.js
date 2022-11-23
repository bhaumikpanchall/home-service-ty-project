const { Categry } = require("../../models");

 const addCategry =async (req,res) =>{
   try{
        console.log(req.body);
        const {category,description} = req.body;
        await Categry.create({category,description});
        res.send("data added");
   }catch(e){
    console.log("error :",e);
   }
}

module.exports =  { addCategry };