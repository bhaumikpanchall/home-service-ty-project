const { Category } = require("../../models");


 const addCategory =async (req,res) =>{
   try{
        console.log(req.body);
        const {category,description,cat_image} = req.body;
        await Category.create({category,description,cat_image});
        res.json({msg: "data added"});
   }catch(e){
    console.log("error :",e);
   }
}

const viewCategory =async (req,res) =>{
    try{
        const data =  await Category.findAll({
            where: {
                category: "Painter"
            }
        });
        res.json({data});
    }catch(e){
     console.log("error :",e);
    }
 }

 const editCategory = async (req, res)=>{
    try{
        console.log(req.body);
        const { id } = req.params;
        const { category } = req.body;
        const payload = {
            category
        }
        const data = await Category.update(payload,{
            where: { id }
        });
        res.json({data, msg: "data updated"});
   }catch(e){
    console.log("error :",e);
   }
 }


module.exports =  { addCategory, viewCategory, editCategory };

// sequealize
// file upload in node js => multer

// middleware
// express-validator validation
// npm i connect-flash
// jsonwebtoken
// npm i nodemailer
//  pagination