const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Subscription = require("./Subscription")

const EventSchema = new Schema({
    type: {
        type: String,
        default: ""
    },
    tournament: {
        type: String,
        default: ""
    },
    starts: {
        type: Date,
        default: ""
    },
    ends: {
        type: Date,
        default: ""
    }
})

EventSchema.pre('deleteOne', { document: true, query: false }, async function() {
    let event = this

    try {
        let subscription = await Subscription.findOne({
            event: event._id
        })

        await subscription.deleteOne()
    } catch (err) {
        console.log(err)
    }
})

module.exports = mongoose.model("Event", EventSchema, "events")