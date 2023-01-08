const { body, validationResult } = require("express-validator");

exports.addSchema = [
  body("category")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .withMessage("Name must contain a valid string")
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z0-9-&_ ]+$")
    .withMessage("Name must contain a valid string"),
  body("description")
    .not()
    .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
    .exists({ checkFalsy: true })
    .matches("^[a-zA-Z0-9-&_ ]+$")
    .withMessage("Description must contain a valid string"),
];

exports.validateAddSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.redirect("addservice");
  }
  next();
};
