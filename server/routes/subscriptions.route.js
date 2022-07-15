const express = require("express")
const subscriptionsRouter = express.Router()


const subscriptionsController = require("../controllers/subscriptions.controller")


subscriptionsRouter.post("/", subscriptionsController.new)

subscriptionsRouter.get("/", subscriptionsController.getAll)
subscriptionsRouter.get("/types", subscriptionsController.getTypes)
subscriptionsRouter.get("/:userName", subscriptionsController.get)

subscriptionsRouter.delete("/", subscriptionsController.deleteAll)
subscriptionsRouter.delete("/:userSubscriptionId", subscriptionsController.delete)


module.exports = subscriptionsRouter