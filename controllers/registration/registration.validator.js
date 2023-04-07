const { body, validationResult } = require("express-validator");

exports.addSchema = [
  body("Fname")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z ]+$")
    .withMessage("First Name must contain a valid string"),
  body("Lname")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z ]+$")
    .withMessage("Last Name must contain a valid string"),
  body("City_id")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[0-9 ]+$")
    .withMessage("Enter valid value."),
  body("Address")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z0-9-&_ ]+$")
    .withMessage("Address must contain a valid string"),
  body("Mobile_no")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[0-9 ]+$")
    .withMessage("Mobile no contain a valid number"),
  body("Email_id")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email must contain a valid string"),
  body("Password")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z0-9-&_@# ]+$")
    .withMessage("Password must contain a valid string"),
  body("UserType")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z ]+$")
    .withMessage("UserType must contain a valid string"),
];

exports.changePasswordSchema = [
  body("oldPassword")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z0-9-&_@# ]+$")
    .withMessage("Password must contain a valid string"),
  body("newPassword")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z0-9-&_@# ]+$")
    .withMessage("Password must contain a valid string"),
  body("confirmPassword")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z0-9-&_@# ]+$")
    .withMessage("Password must contain a valid string"),
];

exports.validateAddSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.redirect("/register");
  }
  next();
};

exports.validateChangePasswordSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.redirect("/changepassword");
  }
  next();
};
