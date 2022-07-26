const mongoose = require("mongoose")
const Schema = mongoose.Schema


const UserSubscription = mongoose.model("UserSubscription", new Schema({
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
        default: new Date(),
        expires: "30d"
    },
    stripeSubId: {
        type: String,
        default: null
    },
    stripePaymentIntent: {
        type: String,
        default: null
    }
}), "usersubscriptions")


module.exports = UserSubscription