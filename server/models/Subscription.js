const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Subscription = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Subscription", Subscription)