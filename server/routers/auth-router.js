// For signin/signup
const express = require("express")
const router = express()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../models/user-model")
const { checkExistingUsername } = require("../middlewares/verify-signup")

router.route("/signup")
.post(checkExistingUsername, async(req, res) => {
    try {
        const user = req.body
        const newUser = new User({username: user.username, password: bcrypt.hashSync(user.password, 8)})
        const savedUser = await newUser.save()
        res.json({success: true, message: "User signed up", data: savedUser})
    } catch (err) {
        console.log("Error occurred while signing user up")
        res.json({success: false, message: "Error while signing user up", errMessage: err.message})
    }
})

router.route("/signin")
.post(async(req, res) => {
    try {
        const user = req.body

        //fetch user
        const existingUser = await User.findOne({username: user.username})
        if(!existingUser) {
            console.log("User with username does not exist")
            return res.json({success: false, message: "User with username does not exist", authToken: ""})
        }

        //authenticate user
        const validatePassword = bcrypt.compareSync(user.password, existingUser.password)
        if(!validatePassword) {
            console.log("Passwords don't match")
            return res.json({success: false, message: "Passwords don't match", authToken: ""})
        }

        //generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 })
        res.json({success: true, message: "User signed in successfully", user: {username: user.username, password: bcrypt.hashSync(user.password, 8)}, authToken: token})
    } catch (err) {
        console.log("Error occurred whie signing user in")
        res.json({success: false, message: "Error occurred while signing in", errMessage: err.message})
    }
})

module.exports = router;