const express = require("express");
const { viewOrder, assignServiceProvider } = require("../controllers/order/order.controller");
const { fetchServiceProviderDetailsByCategory } = require("../controllers/serviceprovider/serviceprovider.controller");
const router = express.Router();

router.get("/", viewOrder);

router.post("/assign", assignServiceProvider);

router.post("/byCategory", fetchServiceProviderDetailsByCategory);

module.exports = router;
