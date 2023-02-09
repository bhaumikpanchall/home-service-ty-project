const jwt = require('jsonwebtoken');

module.exports.authenticateToken = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect('/login');
    } else {
        const { token } = req.cookies;
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) return res.sendStatus(403);
            req.user = data.user;
            next();
        });
    }
};
