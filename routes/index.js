const express = require("express");
const { userLogin } = require("../controllers/login/login.controller");
const {
  addContact,
} = require("../controllers/contact_us/contact_us.controller");
const { homePage, servicePage, bookingPage, bookOrder, editProfilePage, editProfile, myOrders, addFeedback, fetchFeedbacks } = require("../controllers/user/user.controller");
const { rendeServiceProviderDetails, serviceManMoreDetails } = require("../controllers/serviceprovider/serviceprovider.controller");
const { authenticateUserToken } = require("../middlewares/authToken");
const { checkUserLogin } = require("../middlewares/checkLogin");
const { isUser, isServiceProvider } = require("../middlewares/checkRoles");
const { validateLoginSchema, loginSchema } = require("../controllers/login/login.validator");
const { addSchema, validateAddSchema } = require("../controllers/contact_us/contact_us.validator");
const { myProfileDetails, changePassword, forgotPasswordEmailcheck, forgotPasswordOtpcheck, generateNewPassword } = require("../controllers/registration/registration.controller");
const { changePasswordSchema, validateChangePasswordSchema } = require("../controllers/registration/registration.validator");
const { editUserSchema, validateEditUserSchema } = require("../controllers/user/user.validator");

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
router.post("/changepassword",
  changePasswordSchema,
  validateChangePasswordSchema,
  authenticateUserToken,
  isUser,
  changePassword
);
router.get("/editprofile", authenticateUserToken, isUser, editProfilePage);
router.post("/editprofile", editUserSchema, validateEditUserSchema, authenticateUserToken, isUser, editProfile);
router.get("/orders", authenticateUserToken, isUser, myOrders);
router.get("/feedback/:id", authenticateUserToken, isUser, (req, res) => {
  return res.render("feedback", { id: req.params.id });
});
router.post("/addfeedback", authenticateUserToken, isUser, addFeedback);
router.get("/feedbacks", authenticateUserToken, isUser, fetchFeedbacks);

// forgotpassword routes
router.get("/forgotpassword", (req, res) => {
  return res.render("forgotpassword");
});
router.post("/forgotpassword-emailcheck", forgotPasswordEmailcheck);
router.post("/forgotpassword-otpcheck", forgotPasswordOtpcheck);
router.post("/generate-newpassword", generateNewPassword);

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
  let loginData = {};
  if (req.cookies.email && req.cookies.password) {
    loginData = {
      email: req.cookies.email,
      password: req.cookies.password,
    };
  }
  return res.render('login', { data: loginData });
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
