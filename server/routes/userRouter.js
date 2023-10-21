const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/userController")

userRouter.get("/", userController.getAllUsers)
userRouter.post("/signup", userController.signup)
userRouter.put("/:id", userController.updateUser)

module.exports = userRouter
