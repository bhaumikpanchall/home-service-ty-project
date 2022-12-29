const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  addCategory,
  viewCategory,
  editCategory,
} = require("../controllers/category/category.controller");
const imageUpload = require("../helpers/imageUpload");

router.post("/add", imageUpload.single("categoryImage"), addCategory);

router.get("/view", viewCategory);

router.post("/edit/:id", editCategory);

module.exports = router;
