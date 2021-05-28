const { User } = require("../models/user-model")

const checkExistingUsername = async(req, res, next) => {
    try {
        const user = req.body
        const existingUser = await User.findOne({username: user.username})
        if(!existingUser) {
            next()
        }
        else res.json({success: false, message: "Username exists, try another"})
    } catch (err) {
        console.log("Error occurred while checking for duplicate usernames")
        res.json({success: false, message: "Error while checking duplicate username", errMessage: err.message})
    }
}

module.exports = { checkExistingUsername }