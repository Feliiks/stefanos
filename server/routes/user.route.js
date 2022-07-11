const express = require("express")
const userRouter = express.Router()
const passport = require("passport")

const userController = require("../controllers/user.controller")

userRouter.post("/register", userController.register)
userRouter.post("/login", passport.authenticate("local"), userController.login)
userRouter.post("/logout", userController.logout)

module.exports = userRouter