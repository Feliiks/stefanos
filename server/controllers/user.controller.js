const User = require('../models/User')
const UserSubscription = require('../models/UserSubscription')
const { getToken } = require('../authenticate')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const userController = () => {};

userController.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) throw new Error("Informations manquantes.")

        let user = new User({
            username: username
        })

        await User.register(user, password)

        let token = getToken({_id: user._id})

        await user.save()

        res.status(201)
        res.send({ success: true, user, token })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
};


userController.login = async (req, res) => {
    let token = getToken({_id: req.user._id})

    try {
        let user = await User.findById(req.user._id)
        let user_subscriptions = await UserSubscription.findOne({
            "user._id": req.user._id
        })

        await user.save()

        let result = {
            user,
            user_subscriptions
        }

        res.status(200)
        res.send({ success: true, result, token })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

userController.getNewSession = async (req, res) => {
    try {
        // on vérifie l'authenticité de la session
        let payload = await jwt.verify(req.body.token, process.env.JWT_SECRET)

        // on récupère l'user
        let user = await User.findById(payload._id)
        let user_subscriptions = await UserSubscription.findOne({
            "user._id": user._id
        })

        let result = {
            user,
            user_subscriptions
        }

        res.status(200)
        res.send({ success: true, result })
    } catch (err) {
        res.status(401)
        res.send({ success: false, message: err.message })
    }
}

userController.logout = async (req, res) => {
    // logout
}

userController.delete = async (req, res) => {
    // delete
}

module.exports = userController;