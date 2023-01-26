const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  registrationUser,
  viewUsers,
  viewServiceman,
  renderRegistration,
} = require("../controllers/registration/registration.controller");
const {
  addSchema,
  validateAddSchema,
} = require("../controllers/registration/registration.validator");
const imageUpload = require("../helpers/imageUpload");

router.get("/", renderRegistration);

router.post(
  "/add",
  imageUpload.single("Profile_image"),
  addSchema,
  validateAddSchema,
  registrationUser
);
//router.post("/registration", registrationUser);
// router.get("/updateservice", function (req, res) {
//   res.render("admin/updateservice");
// });
module.exports = router;
