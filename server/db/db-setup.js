require("dotenv").config()
const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI;

const initializeDbConnection = async() => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if(mongoose.connection.readyState === 1) {
            console.log("Database Connected Successfully")
        }
        else console.log("still trying to connect....")
    } catch (err) {
        console.log("Database Connection Failed =>", err.message)
    }
}

module.exports = { initializeDbConnection }