const express = require("express")
const emailRouter = express.Router()


const emailController = require('../controllers/email.controller')

emailRouter.post("/contact", emailController.sendContactEmail)

module.exports = emailRouter