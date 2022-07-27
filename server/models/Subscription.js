const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSubscription = require('./UserSubscription')


const Subscription = mongoose.model("Subscription", new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    advantages: [{
        type: String
    }],
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
}), "subscriptions")


// MIDDLEWARES ___________________________________________________________
Subscription.schema.pre("find", function() {
    this.populate("event")
})


module.exports = Subscription