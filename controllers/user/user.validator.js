const { body, validationResult } = require("express-validator");

exports.editUserSchema = [
    body("Fname")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .withMessage("First Name must contain a valid string")
        .exists({ checkFalsy: true })
        .matches("^[a-zA-Z ]+$")
        .withMessage("First Name must contain a valid string"),
    body("Lname")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .withMessage("Last Name must contain a valid string")
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
        .withMessage("Mobile no. contain a valid number"),
];


exports.validateEditUserSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array()[0].msg);
        return res.redirect("/editprofile");
    }
    next();
};

exports.validateEditServiceProviderSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array()[0].msg);
        return res.redirect("/serviceprovider/editprofile");
    }
    next();
};