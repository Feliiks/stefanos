const express = require("express")
const eventRouter = express.Router()


const eventController = require('../controllers/event.controller')

eventRouter.get("/", eventController.getAll)

eventRouter.post("/", eventController.new)

eventRouter.delete("/:eventID", eventController.delete)

module.exports = eventRouter