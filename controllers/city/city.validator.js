const { body, validationResult } = require("express-validator");

exports.addSchema = [
  body("City_name")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z0-9-&_ ]+$")
    .withMessage("Name must contain a valid string"),
];

exports.validateAddSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.redirect("addcity");
  }
  next();
};
