const express = require("express")
const resultRouter = express.Router()

const resultController = require("../controllers/result.controller")


resultRouter.get("/all", resultController.getAll)


module.exports = resultRouter