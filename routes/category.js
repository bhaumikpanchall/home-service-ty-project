const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  addCategory,
  viewCategory,
  edit,
  editCategory,
  deleteCategory,
} = require("../controllers/category/category.controller");
const imageUpload = require("../helpers/imageUpload");

router.get("/addservice", function (req, res) {
  res.render("admin/addservice");
});

// router.get("/updateservice", function (req, res) {
//   res.render("admin/updateservice");
// });

router.get("/viewservice", viewCategory);

router.post("/add", imageUpload.single("categoryImage"), addCategory);

// router.get("/view", viewCategory);

router.get("/edit/:id", edit);

router.post("/edit", editCategory);

router.get("/delete/:id", deleteCategory);

//router.post("/edit", imageUpload.single("categoryImage"), editCategory);
//router.post("/edit/:id", editCategory);

module.exports = router;
