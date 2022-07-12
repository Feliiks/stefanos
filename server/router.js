const express = require('express');

const userRouter = require("./routes/user.route")
const subscriptionsRouter = require("./routes/subscriptions.route")

const mainRouter = express.Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/subscriptions", subscriptionsRouter);

module.exports = mainRouter;