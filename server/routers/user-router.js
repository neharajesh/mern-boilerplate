// For editing user details 
const express = require("express")
const router = express()
const { extend } = require("lodash")

const { User } = require("../models/user-model")

router.param("userId", async(req, res, next, userId) => {
    try {
        const user = await User.findById(userId);
        if(!user) {
            console.log("This user does not exist, userId =>", userId)
            return res.json({success: false, message: "User could not be found", data: []})
        }
        req.user = user
        next()
    } catch (err) {
        console.log("Error occurred while trying to fetch user details")
        res.json({success: false, message: "Error while fetching user details", errMessage: err.message})
    }
})

router.route("/:userId")
.get((req, res) => {
    let { user } = req
    res.json({success: true, message: "User details fetched successfully", data: user})
})
.post(async(req, res) => {
    try {
        let { user } = req
        let userUpdates = req.body
        user = extend(user, userUpdates)
        user = await user.save()
        res.json({success: true, message: "User details updated successfully", data: user})
    } catch (err) {
        console.log("Error occurred while trying to update user details")
        res.json({success: false, message: "Error updating user details", errMessage: err.message})
    }
})
.delete(async(req, res) => {
    try {
        let { user } = req
        await user.remove()
        res.json({success: true, message: "User successfully deleted", data: user})
    } catch (err) {
        console.log("Error occurred while deleteing user")
        res.json({success: false, message: "User could not be deleted", errMessage: err.message})
    }
})

module.exports = router;