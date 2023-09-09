const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header("auth-token");
    if (!token){
        return res.status(401).json({ msg: "No token in header" });
    }
    try {
        const decoded = jwt.verify(token, 'secret-key');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(500).json({
            msg : err.message
        });
    }
};