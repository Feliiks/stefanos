const express = require("express")
const userRouter = express.Router()
const passport = require("passport")

const userController = require("../controllers/user.controller")

userRouter.post("/register", userController.register)
userRouter.post("/login", passport.authenticate("local"), userController.login)
userRouter.post("/getsession", userController.getNewSession)
userRouter.post("/logout", userController.logout)
userRouter.post("/delete", userController.delete)

module.exports = userRouter