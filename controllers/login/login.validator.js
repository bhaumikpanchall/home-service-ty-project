const { body, validationResult } = require("express-validator");

exports.loginSchema = [
    body("Email_id")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .withMessage("Email must contain a valid string")
        .exists({ checkFalsy: true })
        .withMessage("Email must contain a valid string")
        .isEmail(),
    body("Password")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .withMessage("Password must contain a valid string")
        .exists({ checkFalsy: true })
        .withMessage("Password must contain a valid string")
        .matches("^[a-zA-Z0-9-&_@# ]+$")
        .withMessage("Password must contain a valid string"),
];

exports.adminLoginSchema = [
    body("username")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .withMessage("Email must contain a valid string")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Email must contain a valid string"),
    body("password")
        .not()
        .isIn(["null", "NULL", "Null", "undefined", "Undefined"])
        .withMessage("Password must contain a valid string")
        .exists({ checkFalsy: true })
        .matches("^[a-zA-Z0-9-&_@# ]+$")
        .withMessage("Password must contain a valid string"),
];

exports.validateLoginSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("response", errors.array()[0].msg);
        return res.redirect("/login");
    }
    next();
};

exports.validateAdminLoginSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("response", errors.array()[0].msg);
        return res.redirect("/admin/login");
    }
    next();
};