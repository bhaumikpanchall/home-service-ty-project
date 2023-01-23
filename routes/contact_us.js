const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  viewContact,
} = require("../controllers/contact_us/contact_us.controller");

router.get("/viewcontact_us", viewContact);

module.exports = router;
