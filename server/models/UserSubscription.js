const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Subscription = require("./Subscription").schema
const User = require("./User").schema

const UserSubscriptionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription"
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    stripeSubId: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("UserSubscription", UserSubscriptionSchema, "usersubscriptions")