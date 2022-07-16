const mongoose = require("mongoose")
const Schema = mongoose.Schema

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

module.exports = mongoose.model("Event", EventSchema, "events")