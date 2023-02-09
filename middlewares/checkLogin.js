module.exports.checkLogin = (req, res, next) => {
    if (req.cookies.token) {
        res.redirect('/');
    } else {
        next();
    }
};
