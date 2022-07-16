const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSubscription = require('./UserSubscription')

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

SubscriptionSchema.post('deleteOne', { document: true, query: false }, async function() {
    let subscription = this

    try {
        await UserSubscription.deleteMany({
            subscription: subscription._id
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = mongoose.model("Subscription", SubscriptionSchema, "subscriptions")