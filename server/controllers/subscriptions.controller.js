const User = require('../models/User')
const Subscription = require('../models/Subscription')
const UserSubscription = require('../models/UserSubscription')
const stripe = require('stripe')('sk_test_51KQwI8CPsIWMaO3U5aAZEycljZaYMDHlGMncpOVjgX0YswyrIuGoqR1q0p8SLpKGNsOyTmY8DpH9FoRr8lIL8Ott00M9bswsgn');

const subscriptionsController = () => {};

subscriptionsController.new = async (req, res) => {
    try {
        let user = await User.findOne({
            username: req.body.username
        })
        let subscription = await Subscription.findById(req.body.subscription_id)

        let existingSubscription = await UserSubscription.findOne({
            user: user,
            subscription: subscription,
        })

        if (!user || !subscription || existingSubscription) throw new Error

        await UserSubscription.create({
            user: user,
            subscription: subscription,
            stripeSubId: req.body.stripe_subscription_id
        })

        res.sendStatus(201)
    } catch (err) {
        res.status(400)
        res.send(err.message)
    }
}

subscriptionsController.get = async (req, res) => {
    try {
        if (req.query.user) {
            let user = await User.findOne({
                username: req.query.user
            })

            let user_subscriptions = await UserSubscription.find({
                user: user
            }).populate("subscription")

            res.status(200)
            res.send({ success: true, user_subscriptions})
        } else {
            let all_user_subscriptions = await UserSubscription.find().populate("user").populate("subscription")

            res.status(200)
            res.send({ success: true, all_user_subscriptions})
        }
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "Aucun abonnement trouvé." })
    }
}

subscriptionsController.getTypes = async (req, res) => {
    try {
        let subscriptionTypes = await Subscription.find()

        res.status(200)
        res.send({ success: true, subscriptionTypes })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "Aucun type d'abonnement trouvé." })
    }
}

subscriptionsController.delete = async (req, res) => {
    try {
        let deletedSubscription = await UserSubscription.findOneAndDelete({
            _id: req.body.user_subscription_id
        })

        if (!deletedSubscription) throw new Error

        if (deletedSubscription.stripeSubId !== null) {
            await stripe.subscriptions.del(deletedSubscription.stripeSubId);
        }

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }
}


module.exports = subscriptionsController;