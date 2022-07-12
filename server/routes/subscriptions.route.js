const express = require("express")
const subscriptionsRouter = express.Router()

const subscriptionsController = require("../controllers/subscriptions.controller")

subscriptionsRouter.get("/")
subscriptionsRouter.post("/new", subscriptionsController.new)
subscriptionsRouter.post("/delete", subscriptionsController.delete)

module.exports = subscriptionsRouter