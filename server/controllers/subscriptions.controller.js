const User = require('../models/User')
const Subscription = require('../models/Subscription')
const UserSubscription = require('../models/UserSubscription')

const subscriptionsController = () => {};

subscriptionsController.new = async (req, res) => {
    try {
        let user = await User.findById(req.user._id)
        let subscription = await Subscription.findOne({
            name: req.body.subscription_name
        })

        if (!subscription) throw new Error

        let existingSubscription = await UserSubscription.findOne({
            user: {
                _id: req.user._id
            }
        })

        if (!existingSubscription) {
            await UserSubscription.create({
                user: user,
                subscription: subscription
            })

            res.sendStatus(201)
        } else {
            await UserSubscription.findOneAndUpdate({
                user: user,
                subscription: subscription
            }, {
                expirationDate: existingSubscription.expirationDate.setDate(existingSubscription.expirationDate.getDate() + 31)
            })

            res.sendStatus(200)
        }
    } catch (err) {
        res.sendStatus(400)
    }
}

subscriptionsController.delete = async (req, res) => {
    try {
        let user = await User.findById(req.user._id)
        let subscription = await User.findOne({
            name: req.body.subscription_name
        })

        if (!user || !subscription) throw new Error

        await UserSubscription.findOneAndDelete({
            user: user,
            subscription: subscription
        })

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }
}


module.exports = subscriptionsController;