const axios = require('axios')
const stripe = require('stripe')('sk_test_51KQwI8CPsIWMaO3U5aAZEycljZaYMDHlGMncpOVjgX0YswyrIuGoqR1q0p8SLpKGNsOyTmY8DpH9FoRr8lIL8Ott00M9bswsgn');


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
        const session = await stripe.checkout.sessions.retrieve(req.body.session_id);

        if (session.status !== "complete") throw new Error

        await axios.post("http://localhost:5000/subscriptions/new", {
            username: session.customer_email,
            subscription_id: session.metadata.subscription_id,
            stripe_subscription_id: session.subscription
        })

        res.status(200)
        res.send({ success: true, session })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

module.exports = paymentController;