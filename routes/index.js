const express = require("express");
const { viewCategory } = require("../controllers/category/category.controller");
const { userLogin } = require("../controllers/login/login.controller");
const {
  addContact,
} = require("../controllers/contact_us/contact_us.controller");
const {
  viewUsers,
  viewServiceman,
} = require("../controllers/registration/registration.controller");
const { homePage, servicePage } = require("../controllers/user/user.controller");

/* const {
  registrationUser,
  viewUserData,
} = require("../controllers/registration/registration.controller"); */
const router = express.Router();

/* GET home page. */
router.get("/", homePage);

//about
router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/serviceproviderdetails", function (req, res) {
  res.render("serviceproviderdetails");
});

router.get("/contact", function (req, res) {
  res.render("contact");
});

router.post("/contact", addContact);

router.get("/service", servicePage);

// router.get("/contactus", function (req, res) {
//   res.render("admin/contactus");
// });

router.get("/booking", function (req, res) {
  res.render("booking");
});

router.get("/bookform", function (req, res) {
  res.render("bookform");
});


router.get("/admin", function (req, res) {
  res.render("admin/admin");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", userLogin);

// router.get("/register", function (req, res) {
//   res.render("register");
// });

router.get("/user", viewUsers);

router.get("/serviceman", viewServiceman);

router.get("/order", function (req, res) {
  res.render("admin/order");
});

router.get("/serviceman", function (req, res) {
  res.render("serviceman");
});

//router.post("/registration", registrationUser);

//router.get("/registrationData", viewUserData);

module.exports = router;
