const { body, validationResult } = require("express-validator");

exports.addSchema = [
    body("Name")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .exists({ checkFalsy: true })
        .matches("^[a-zA-Z ]+$")
        .withMessage("First Name must contain a valid string"),
    body("Email")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Email must contain a valid string"),
    body("Subject")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .exists({ checkFalsy: true })
        .matches("^[a-zA-Z ]+$")
        .withMessage("Subject must contain a valid string"),
    body("Mobile_no")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .exists({ checkFalsy: true })
        .matches("^[0-9 ]+$")
        .withMessage("Mobile no contain a valid number"),
    body("Message")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .exists({ checkFalsy: true })
        .matches("^[a-zA-Z0-9-&_ ]+$")
        .withMessage("Message must contain a valid string"),

];

exports.validateAddSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("response", errors.array()[0].msg);
        return res.redirect("/contact");
    }
    next();
};
