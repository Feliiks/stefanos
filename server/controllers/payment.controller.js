const axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const paymentController = () => {};

paymentController.createCheckoutSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: req.body.price_id,
                    quantity: 1,
                },
            ],
            allow_promotion_codes: true,
            metadata: {
              subscription_id: req.body.subscription_id
            },
            customer_email: req.body.username,
            mode: req.body.mode,
            success_url: `http://localhost:3000/payment/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/payment/canceled/{CHECKOUT_SESSION_ID}`,
        });

        res.status(200)
        res.send({ success: true, url: session.url })
    } catch (err) {
        console.log(err.message)
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

paymentController.getCheckoutSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionID);

        if (session.status !== "complete") throw new Error

        await axios.post("http://localhost:5000/v1/subscriptions", {
            username: session.customer_email,
            subscription_id: session.metadata.subscription_id,
            stripe_subscription_id: session.subscription,
            stripe_payment_intent: session.payment_intent
        })

        res.status(200)
        res.send({ success: true, session })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

module.exports = paymentController;