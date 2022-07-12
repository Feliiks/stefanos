const User = require('../models/User')
const Subscription = require('../models/Subscription')
const UserSubscription = require('../models/UserSubscription')

const subscriptionsController = () => {};

subscriptionsController.new = async (req, res) => {
    try {
        let user = await User.findById(req.user._id)
        let subscription = await Subscription.findById({
            _id: req.body.subscription_id
        })

        if (!subscription) throw new Error

        let existingSubscription = await UserSubscription.findOne({
            "user._id": req.user._id,
            "subscription._id": req.body.subscription_id
        })

        if (!existingSubscription) {
            await UserSubscription.create({
                user: user,
                subscription: subscription
            })

            res.sendStatus(201)
        } else {
            await UserSubscription.findOneAndUpdate({
                "user._id": req.user._id,
                "subscription._id": req.body.subscription_id
            }, {
                expirationDate: existingSubscription.expirationDate.setDate(existingSubscription.expirationDate.getDate() + 31)
            })

            res.sendStatus(200)
        }
    } catch (err) {
        res.send(err.message)
    }
}

subscriptionsController.get = async (req, res) => {
    const user_name = req.query.user

    try {
        let user = await User.findOne({
            username: user_name
        })

        if (!user) throw new Error

        let user_subscriptions = await UserSubscription.find({
            "user.username": user_name,
        })

        res.status(200)
        res.send({ success: true, user_subscriptions})
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "Aucun abonnement trouvé." })
    }
}

subscriptionsController.delete = async (req, res) => {
    try {
        let deletedSubscription = await UserSubscription.findOneAndDelete({
            _id: req.body.user_subscription_id
        })

        if (!deletedSubscription) throw new Error

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }
}


module.exports = subscriptionsController;