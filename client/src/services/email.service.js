import api from "../lib/api"


const EmailService = () => {};

EmailService.create = async (email, subject, message) => {
    return await api.post("/emails/contact", {
        email: email,
        subject: subject,
        message: message
    })
}

export default EmailService