const Event = require('../models/Event')
const Subscription = require('../models/Subscription')

const eventController = () => {};

// POST _________________________________________________________________
eventController.new = async (req, res) => {
    try {
        let existingEvent = await Event.findOne({
            tournament: req.body.tournament
        })

        if (existingEvent) throw new Error()

        let event = await Event.create({
            type: "Grand Chelem",
            tournament: req.body.tournament,
            starts: req.body.starts,
            ends: req.body.ends
        })

        await Subscription.findByIdAndUpdate("62cd228f443f1ea6f019d96d", {
            isActive: true,
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
        await Event.findByIdAndDelete(req.params.eventID)
        await Subscription.findByIdAndUpdate("62cd228f443f1ea6f019d96d", {
            isActive: false,
            event: null
        })

        // Delete sur UserSubscription
        // Delete Stripe

        res.status(200)
        res.send({ success: true, message: "Events deleted." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "No event found." })
    }
}


module.exports = eventController;