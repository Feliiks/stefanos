const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const sendMail = async (from, to, subject, message) => {
    try {
        const oAuth2Client = new google.auth.OAuth2(process.env.MAIL_CLIENT_ID, process.env.MAIL_CLIENT_SECRET, process.env.MAIL_REDIRECT_URI);
        oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });
        const accessToken = oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "stefanosprosite@gmail.com",
                clientId: process.env.MAIL_CLIENT_ID,
                clientSecret: process.env.MAIL_CLIENT_SECRET,
                refreshToken: process.env.MAIL_REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        return transporter.sendMail({
            from: from,
            to: to,
            subject: `${subject}`,
            html: `
                <p> 
                    ${message} 
                    <br />
                    <br />
                    Utilisateur : ${from}
                </p>
            `
        })
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports = { sendMail }