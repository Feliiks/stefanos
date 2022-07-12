const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Subscription = require("./Subscription").schema
const User = require("./User").schema

const UserSubscriptionSchema = new Schema({
    user: User,
    subscription: Subscription,
    expirationDate: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 31)
    }
})

module.exports = mongoose.model("UserSubscription", UserSubscriptionSchema, "usersubscriptions")