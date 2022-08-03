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
    stripeSubId: {
        type: String,
        default: null
    },
    stripePaymentIntent: {
        type: String,
        default: null
    }
},
{
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
}), "usersubscriptions")

UserSubscription.schema.index({ created_at: 1 }, { expireAfterSeconds: 2592000 })


module.exports = UserSubscription