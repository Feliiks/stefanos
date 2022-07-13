const User = require('../models/User')
const UserSubscription = require('../models/UserSubscription')
const { getToken } = require('../authenticate')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const userController = () => {};

userController.getAllUsers = async (req, res) => {
    try {
        if (req.query.user) {
            let user = await User.findOne({
                username: req.query.user
            })

            if (!user) throw new Error

            res.status(200)
            res.send({ success: true, user })
        } else {
            let users = await User.find()

            res.status(200)
            res.send({ success: true, users })
        }
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "Aucun utilisateur trouvé." })
    }
}

userController.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) throw new Error("Informations manquantes.")

        let user = new User({
            username: username
        })

        await User.register(user, password)

        let token = getToken({_id: user._id})

        user.token = token

        await user.save()

        let user_subscriptions = []

        let result = {
            user,
            user_subscriptions
        }

        res.status(201)
        res.send({ success: true, result, token })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
};

userController.updateUsername = async (req, res) => {
    let new_username = req.body.new_username

    try {
        let existingUser = await User.findOne({
            username: new_username
        })

        if (existingUser) throw new Error("Username unavailable.")

        let user = await User.findByIdAndUpdate(req.body.user_id, {
            username: new_username
        })

        if (!user) throw new Error

        res.status(200)
        res.send({ success: true, message: "User username updated." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

userController.updatePassword = async (req, res) => {
    try {
        let user = await User.findById(req.body.user_id)

        if (!user) throw new Error

        await user.changePassword(req.body.current_password, req.body.new_password)

        user.save()

        res.status(200)
        res.send({ success: true, message: "User password updated." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

userController.login = async (req, res) => {
    let token = getToken({_id: req.user._id})

    try {
        let user = await User.findById(req.user._id)
        let user_subscriptions = await UserSubscription.find({
            user: user
        }).populate("subscription")

        user.token = token

        await user.save()

        let result = {
            user,
            user_subscriptions
        }

        res.status(200)
        res.send({ success: true, result, token })
    } catch (err) {
        console.log(err.message)
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

        if (user.token !== req.body.token) throw new Error

        let user_subscriptions = await UserSubscription.find({
            user: user
        }).populate("subscription")

        let result = {
            user,
            user_subscriptions
        }

        res.status(200)
        res.send({ success: true, result })
    } catch (err) {
        console.log(err.message)
        res.status(401)
        res.send({ success: false, message: err.message })
    }
}

userController.logout = async (req, res) => {
    try {
        let user = await User.findById(req.body.user_id)

        user.token = ""

        user.save()

        res.status(200)
        res.send({ success: true })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

userController.delete = async (req, res) => {
    try {
        let deletedUser = await User.findOneAndDelete({
            username: req.body.username
        })

        if (!deletedUser) throw new Error

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }
}

module.exports = userController;