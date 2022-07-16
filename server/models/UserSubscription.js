const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
        default: null
    },
    stripePaymentIntent: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("UserSubscription", UserSubscriptionSchema, "usersubscriptions")