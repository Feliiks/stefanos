const express = require('express');

const userRouter = require("./routes/user.route")
const subscriptionsRouter = require("./routes/subscriptions.route")
const paymentRouter = require('./routes/payment.route')
const eventRouter = require('./routes/event.route')
const pronosticRouter = require('./routes/pronostic.route')
const emailRouter = require('./routes/email.route')
const resultRouter = require('./routes/result.route')

const mainRouter = express.Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/subscriptions", subscriptionsRouter);
mainRouter.use("/payments", paymentRouter);
mainRouter.use("/events", eventRouter);
mainRouter.use("/pronostics", pronosticRouter);
mainRouter.use("/emails", emailRouter);
mainRouter.use("/results", resultRouter);

module.exports = mainRouter;