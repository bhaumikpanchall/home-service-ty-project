const express = require("express");
const { adminLogin } = require("../controllers/login/login.controller");
const { adminLoginSchema, validateAdminLoginSchema } = require("../controllers/login/login.validator");
const { viewUsers, viewServiceman } = require("../controllers/registration/registration.controller");
const { serviceManMoreDetails } = require("../controllers/serviceprovider/serviceprovider.controller");
const { authenticateAdminToken } = require("../middlewares/authToken");
const { checkAdminLogin } = require("../middlewares/checkLogin");
const { isAdmin } = require("../middlewares/checkRoles");
const router = express.Router();
const CategoryRoutes = require("./category");
const CityRoutes = require("./city");
const ContactRoutes = require("./contact_us");
const OrderRoutes = require("./order");
const FeedbackRoutes = require("./feedback");
const { HomePage } = require("../controllers/admin/admin.controller");


router.get("/user", authenticateAdminToken, isAdmin, viewUsers);
router.get("/serviceman", authenticateAdminToken, isAdmin, viewServiceman);
router.get("/serviceman/details/:id", serviceManMoreDetails);

router.get("/", authenticateAdminToken, isAdmin, HomePage);
router.use("/category", authenticateAdminToken, isAdmin, CategoryRoutes);
router.use("/city", authenticateAdminToken, isAdmin, CityRoutes);
router.use("/order", authenticateAdminToken, isAdmin, OrderRoutes);
router.use("/contact_us", authenticateAdminToken, isAdmin, ContactRoutes);
router.use("/feedbacks", authenticateAdminToken, isAdmin, FeedbackRoutes);

router.get("/login", checkAdminLogin, (req, res) => {
    let loginData = {};
    if (req.cookies.email && req.cookies.password) {
        loginData = {
            adminemail: req.cookies.adminemail,
            adminpassword: req.cookies.adminpassword,
        };
    }
    return res.render('admin/login', { data: loginData });
})

router.post("/login", checkAdminLogin, adminLoginSchema, validateAdminLoginSchema, adminLogin);

module.exports = router;
