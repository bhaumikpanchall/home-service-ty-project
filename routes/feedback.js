const express = require("express");
const { viewFeedbacks, editStatus } = require("../controllers/feedback/feedback.controller");
const router = express.Router();

router.get("/", viewFeedbacks);

router.get("/edit/:id", editStatus);

module.exports = router;
