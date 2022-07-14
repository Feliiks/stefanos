const express = require("express")
const paymentRouter = express.Router()

const paymentController = require("../controllers/payment.controller")

paymentRouter.post("/create-checkout-session", paymentController.createCheckoutSession)
paymentRouter.post("/get-checkout-session", paymentController.getCheckoutSession)

module.exports = paymentRouter