const { sendMail } = require("../utils/transporter")


const emailController = () => {};


// POST _________________________________________________________________
emailController.sendContactEmail = async (req, res) => {
    try {
        await sendMail(
            req.body.email,
            "sobrero.ludovic@gmail.com",
            req.body.subject,
            req.body.message
        )

        res.status(200)
        res.send({ success: true, message: "Merci! Votre email a bien été envoyé." })
    } catch (err) {
        console.log(err.message)
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}


module.exports = emailController;