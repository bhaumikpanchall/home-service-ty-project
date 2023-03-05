const express = require("express");
const { viewOrder, assignServiceProvider } = require("../controllers/order/order.controller");
const router = express.Router();

router.get("/", viewOrder);

router.post("/assign", assignServiceProvider);

module.exports = router;
