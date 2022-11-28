const express = require('express');
const router = express.Router();
const {addCategory, viewCategory, editCategory} = require("../controllers/category/category.controller");


router.post("/add",addCategory);

router.get("/view",viewCategory);

router.post("/edit/:id",editCategory);



module.exports = router;
