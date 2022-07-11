const express = require('express');

const userRouter = require("./routes/user.route")

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);

module.exports = mainRouter;