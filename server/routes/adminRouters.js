const express = require("express")
const adminRouter = express.Router()

const adminController = require("../controllers/adminController")

adminRouter.post("/signup", adminController.adminSignup)
adminRouter.post("/login", adminController.adminLogin)

module.exports = adminRouter
