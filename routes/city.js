const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  addCity,
  viewCity,
  edit,
  editCity,
  deleteCity,
} = require("../controllers/city/city.controller");

router.get("/addcity", function (req, res) {
  res.render("admin/addcity");
});

router.post("/add", addCity);
router.get("/viewcity", viewCity);

router.get("/edit/:id", edit);

router.post("/edit", editCity);

router.get("/delete/:id", deleteCity);

module.exports = router;
