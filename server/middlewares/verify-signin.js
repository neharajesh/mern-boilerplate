const jwt = require("jsonwebtoken");

const { User } = require("../models/user-model")
const secret = process.env["JWT_SECRET"]

const verifyToken = (req, res, next) => {
    try {
        let token = req.headers["x-access-token"]
        if(!token) {
            return res.status(403).json({success: false, message: "no token provided"})
        }
        jwt.verify(token, secret, () => {
            req.userId = decoded.id;
            next()
        })
    } catch (err) {
        res.status(400).json({success: false, message: "error occured while verifying token"})
    }
} 

module.exports = { verifyToken }