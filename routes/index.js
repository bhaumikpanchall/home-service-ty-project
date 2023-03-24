const express = require("express");
const { userLogin } = require("../controllers/login/login.controller");
const {
  addContact,
} = require("../controllers/contact_us/contact_us.controller");
const { homePage, servicePage, bookingPage, bookOrder } = require("../controllers/user/user.controller");
const { rendeServiceProviderDetails, serviceManMoreDetails } = require("../controllers/serviceprovider/serviceprovider.controller");
const { authenticateUserToken } = require("../middlewares/authToken");
const { checkUserLogin } = require("../middlewares/checkLogin");
const { isUser, isServiceProvider } = require("../middlewares/checkRoles");
const { validateLoginSchema, loginSchema } = require("../controllers/login/login.validator");
const { addSchema, validateAddSchema } = require("../controllers/contact_us/contact_us.validator");
const { myProfileDetails, changePassword } = require("../controllers/registration/registration.controller");

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

// profile routes
router.get("/profile", authenticateUserToken, isUser, myProfileDetails);
router.get("/changepassword", authenticateUserToken, isUser, (req, res) => {
  return res.render("changepassword");
});
router.post("/changepassword", authenticateUserToken, isUser, changePassword);


router.get(
  "/serviceproviderdetails",
  authenticateUserToken,
  isServiceProvider,
  rendeServiceProviderDetails
);

router.get("/contact", function (req, res) {
  res.render("contact");
});

router.post("/contact", addSchema, validateAddSchema, addContact);

router.get("/service", servicePage);

// router.get("/contactus", function (req, res) {
//   res.render("admin/contactus");
// });

router.get("/booking/:id", authenticateUserToken, isUser, bookingPage);

router.post("/bookorder", authenticateUserToken, isUser, bookOrder);

// router.get("/bookform", function (req, res) {
//   res.render("bookform");
// });

router.get("/login", checkUserLogin, function (req, res) {
  res.render("login");
});

router.post("/login", checkUserLogin, loginSchema, validateLoginSchema, userLogin);

router.get("/logout", (req, res) => {
  res.clearCookie('token');
  return res.redirect('/login');
});

// router.get("/register", function (req, res) {
//   res.render("register");
// });

// router.get("/user", viewUsers);

// router.get("/serviceman", viewServiceman);

// router.get("/order", function (req, res) {
//   res.render("admin/order");
// });

router.get("/serviceman", function (req, res) {
  res.render("serviceman");
});

// router.get("/servicemandetails/:id", serviceManMoreDetails);
//router.post("/registration", registrationUser);

//router.get("/registrationData", viewUserData);

module.exports = router;
