const express = require("express")
const paymentRouter = express.Router()

const paymentController = require("../controllers/payment.controller")

paymentRouter.post("/checkout-session", paymentController.createCheckoutSession)
paymentRouter.get("/checkout-session/:sessionID", paymentController.getCheckoutSession)

module.exports = paymentRouter