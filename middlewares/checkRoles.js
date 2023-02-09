const { USER_ROLES } = require("../utils/constants");

const isUser = (req, res, next) => {
    if (req.user.UserType === USER_ROLES.USER) {
        next();
    } else {
        res.redirect("/admin");
    }
};

const isServiceProvider = (req, res, next) => {
    if (req.user.UserType === USER_ROLES.SERVICE_PROVIDER) {
        next();
    } else {
        res.redirect('/admin');
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.UserType === USER_ROLES.ADMIN) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = {
    isUser,
    isServiceProvider,
    isAdmin,
};