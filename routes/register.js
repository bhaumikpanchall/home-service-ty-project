const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  registrationUser,
} = require("../controllers/registration/registration.controller");
const imageUpload = require("../helpers/imageUpload");

router.get("/register", function (req, res) {
  res.render("/register");
});

router.post("/add", imageUpload.single("Profile_image"), registrationUser);
//router.post("/registration", registrationUser);
// router.get("/updateservice", function (req, res) {
//   res.render("admin/updateservice");
// });

module.exports = router;
