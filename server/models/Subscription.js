const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SubscriptionSchema = new Schema({
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
    },
    typeId: {
        type: String,
        default: "0"
    },
    facturationType: {
        type: String,
        default: ""
    },
    stripePriceId: {
        type: String,
        default: ""
    },
    mode: {
        type: String,
        default: ""
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: null
    }
})

module.exports = mongoose.model("Subscription", SubscriptionSchema, "subscriptions")