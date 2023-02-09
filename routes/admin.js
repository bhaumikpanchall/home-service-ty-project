const express = require("express");
const { adminLogin } = require("../controllers/login/login.controller");
const { viewUsers, viewServiceman } = require("../controllers/registration/registration.controller");
const { authenticateAdminToken } = require("../middlewares/authToken");
const { checkAdminLogin } = require("../middlewares/checkLogin");
const { isAdmin } = require("../middlewares/checkRoles");
const router = express.Router();
const CategoryRoutes = require("./category");
const CityRoutes = require("./city");
const ContactRoutes = require("./contact_us");

router.get("/user", authenticateAdminToken, isAdmin, viewUsers);
router.get("/serviceman", authenticateAdminToken, isAdmin, viewServiceman);
router.get("/", authenticateAdminToken, isAdmin, (req, res) => {
    res.render("admin/admin");
});
router.use("/category", authenticateAdminToken, isAdmin, CategoryRoutes);
router.use("/city", authenticateAdminToken, isAdmin, CityRoutes);
router.use("/contact_us", authenticateAdminToken, isAdmin, ContactRoutes);
router.get("/login", checkAdminLogin, (req, res) => {
    res.render("admin/login")
})
router.post("/login", checkAdminLogin, adminLogin);

module.exports = router;
