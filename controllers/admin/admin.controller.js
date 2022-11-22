const { Admin } = require("../../models");


 const addAdmin =async (req,res) =>{
   try{
        console.log(req.body);
        const {username,password} = req.body;
        await Admin.create({username : username,password});
        res.send("data added");
   }catch(e){
    console.log("error :",e);
   }
}

module.exports =  { addAdmin };