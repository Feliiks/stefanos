const Event = require('../models/Event')
const Subscription = require('../models/Subscription')
const UserSubscription = require('../models/UserSubscription')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const eventController = () => {};

// POST _________________________________________________________________
eventController.new = async (req, res) => {
    try {
        let existingEvent = await Event.findOne({
            tournament: req.body.tournament
        })

        if (existingEvent) throw new Error()

        const price = await stripe.prices.retrieve(req.body.stripe_price_id);
        const product = await stripe.products.retrieve(price.product)

        let event = await Event.create({
            type: "Grand Chelem",
            tournament: req.body.tournament,
            starts: new Date(req.body.starts),
            ends: new Date(req.body.ends),
            expireAt: new Date(req.body.ends)
        })

        await Subscription.create({
            name: product.name,
            description: product.description,
            image: product.images[0],
            price: price.unit_amount,
            stripePriceId: req.body.stripe_price_id,
            mode: "payment",
            event: event,
            advantages: [
                "Avantage 1",
                "Avantage 2",
                "Avantage 3"
            ]
        })

        res.status(201)
        res.send({ success: true, message: "L'événement a été créé.", event })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}


// GET _______________________________________________________________
eventController.getAll = async (req, res) => {
    try {
        let events_list = await Event.find()

        if (!events_list[0]) throw new Error()

        res.status(200)
        res.send({ success: true, events_list })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "No event found." })
    }
}


// DELETE _____________________________________________________________
eventController.delete = async (req, res) => {
    try {
        let doc = await Event.findOne({
            _id: req.params.eventID
        })

        await doc.deleteOne()

        res.status(200)
        res.send({ success: true, message: "L'événement a été supprimé." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "Aucun événement trouvé." })
    }
}


module.exports = eventController;