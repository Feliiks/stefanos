const express = require("express")
const subscriptionsRouter = express.Router()

const subscriptionsController = require("../controllers/subscriptions.controller")

subscriptionsRouter.post("/new", subscriptionsController.new)
subscriptionsRouter.get("/", subscriptionsController.get)
subscriptionsRouter.get("/types", subscriptionsController.getTypes)
subscriptionsRouter.post("/delete", subscriptionsController.delete)

module.exports = subscriptionsRouter