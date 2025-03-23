require("dotenv").config();

const tokenMiddleware = (req, res, next) => {
    const token = req.query.token;

    if (!token) {
        return res.status(401).json({ status: 0, msg: "Token required!" });
    }
    if (token !== process.env.TOKEN) { 
        return res.status(403).json({ status: 0, msg: "Invalid token!" });
    }

    next();
};

module.exports = { tokenMiddleware };
