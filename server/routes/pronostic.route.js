const express = require("express")
const pronosticRouter = express.Router()


const pronosticController = require('../controllers/pronostic.controller')

pronosticRouter.get("/all", pronosticController.getAll)
pronosticRouter.get("/gc", pronosticController.getGC)

module.exports = pronosticRouter