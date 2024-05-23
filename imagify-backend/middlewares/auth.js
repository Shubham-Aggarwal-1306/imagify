const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.isAuthenticated  = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json(
            {
                message: "Please Login First",
            }
        );
    }
    const decoded = await jwt.decode(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json(
            {
                message: "Please Login First",
            }
        );
    }
    req.user = await User.findById(decoded._id);
    next();
}