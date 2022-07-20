const express = require("express")
const userRouter = express.Router()
const passport = require("passport")

const userController = require("../controllers/user.controller")

userRouter.get("/", userController.getAll)
userRouter.get("/:userName", userController.get)

userRouter.post("/", userController.register)
userRouter.post("/google", userController.registerWithGoogle)
userRouter.post("/login", passport.authenticate("local"), userController.login)
userRouter.post("/login/google", userController.loginWithGoogle)
userRouter.post("/getsession", userController.getNewSession)
userRouter.post("/logout", userController.logout)

userRouter.put("/username/:userID", userController.updateUsername)
userRouter.put("/password/:userID", userController.updatePassword)
userRouter.put("/admin/:userID", userController.updateAdminStatus)

userRouter.delete("/", userController.deleteAll)
userRouter.delete("/:userID", userController.delete)

module.exports = userRouter