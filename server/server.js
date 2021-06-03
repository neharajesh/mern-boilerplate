require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const { initializeDbConnection } = require("./db/db-setup")
initializeDbConnection();

const app = express();
app.use(bodyParser.json());
app.use(cors())
const PORT = process.env.PORT;

const authRouter = require("./routers/auth-router")
const userRouter = require("./routers/user-router")
const { verifyToken } = require("./middlewares/verify-signin")

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'POST, OPTIONS',  "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use("/auth", authRouter)
app.use("/user", userRouter)

app.get("/protectedRoute", verifyToken, (req, res) => {
    try {
        res.json({success: true, message: "token verified"})
    } catch (err) {
        res.json({success: false, message: "token could not be verified", errMessage: err.message})
    }
})

app.get("/", (req, res) => {
    res.json({success: true, message: "Loaded successfully"})
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})