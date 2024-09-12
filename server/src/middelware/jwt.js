const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"].split(' ')[1];

    if (!token) {
        return res.status(403).send({ message: "No token provided!", status: 403 });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Unauthorized!", status: 403 });
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.role !== "admin") {
        return res.status(403).send({ message: "Require Admin Role!", status: 403 });
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin
};
