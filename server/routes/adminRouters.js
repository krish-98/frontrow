const express = require("express")
const adminRouter = express.Router()

const adminController = require("../controllers/adminController")

adminRouter.post("/signup", adminController.addAdmin)

module.exports = adminRouter
