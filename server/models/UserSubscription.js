const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSubscription = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: "Subscription"
    },
    expirationDate: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 31)
    }
})

module.exports = mongoose.model("UserSubscription", UserSubscription)