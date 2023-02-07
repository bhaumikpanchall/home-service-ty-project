const express = require("express");
const router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res) {
//   res.send("respond with a resource");
// });
const {
  addServiceProviderDetails,
  viewServiceProviderDetails
} = require("../controllers/serviceprovider/serviceprovider.controller");
const imageUpload = require("../helpers/imageUpload");


router.get("/", viewServiceProviderDetails);

// router.post(
//   "/add",
//   imageUpload.single("Document_image"),
//   addServiceProviderDetails,
// );

router.post("/add",
  imageUpload.single("Document_image"),
  addServiceProviderDetails);
module.exports = router;
