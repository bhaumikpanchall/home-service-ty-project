const checkUserLogin = (req, res, next) => {
    if (req.cookies.token) {
        res.redirect('/');
    } else {
        next();
    }
};

const checkAdminLogin = (req, res, next) => {
    if (req.cookies.token) {
        res.redirect('/admin');
    } else {
        next();
    }
};

module.exports = {
    checkUserLogin,
    checkAdminLogin,
};