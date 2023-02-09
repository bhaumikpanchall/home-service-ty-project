const express = require("express");
const { userLogin } = require("../controllers/login/login.controller");
const {
  addContact,
} = require("../controllers/contact_us/contact_us.controller");
const { homePage, servicePage } = require("../controllers/user/user.controller");
const { rendeServiceProviderDetails, serviceManMoreDetails } = require("../controllers/serviceprovider/serviceprovider.controller");
const { authenticateUserToken } = require("../middlewares/authToken");
const { checkUserLogin } = require("../middlewares/checkLogin");
const { isUser } = require("../middlewares/checkRoles");

/* const {
  registrationUser,
  viewUserData,
} = require("../controllers/registration/registration.controller"); */
const router = express.Router();

/* GET home page. */
router.get("/", authenticateUserToken, isUser, homePage);

//about

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/serviceproviderdetails", rendeServiceProviderDetails);

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

router.get("/login", checkUserLogin, function (req, res) {
  res.render("login");
});

router.post("/login", checkUserLogin, userLogin);

router.get("/logout", (req, res) => {
  res.clearCookie('token');
  return res.redirect('/login');
});

// router.get("/register", function (req, res) {
//   res.render("register");
// });

// router.get("/user", viewUsers);

// router.get("/serviceman", viewServiceman);

router.get("/order", function (req, res) {
  res.render("admin/order");
});

router.get("/serviceman", function (req, res) {
  res.render("serviceman");
});

router.get("/servicemandetails/:id", serviceManMoreDetails);
//router.post("/registration", registrationUser);

//router.get("/registrationData", viewUserData);

module.exports = router;
