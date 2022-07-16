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

        let event = await Event.create({
            type: "Grand Chelem",
            tournament: req.body.tournament,
            starts: req.body.starts,
            ends: req.body.ends
        })

        await Subscription.create({
            name: event.tournament,
            description: "Cet abonnement à durée limitée vous fera profiter de nos pronostics pour le tournoi en cours.",
            price: price.unit_amount,
            stripePriceId: req.body.stripe_price_id,
            mode: "payment",
            event: event
        })

        res.status(201)
        res.send({ success: true, message: "Event created.", event })
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
        res.send({ success: true, message: "Event deleted." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "No event found." })
    }
}


module.exports = eventController;