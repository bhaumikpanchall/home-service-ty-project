const express = require("express");
const router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res) {
//   res.send("respond with a resource");
// });

router.get("/", function (req, res) {
  res.render("contactus");
});

module.exports = router;
