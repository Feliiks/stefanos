const User = require('../models/User')
const UserSubscription = require('../models/UserSubscription')
const { getToken } = require('../authenticate')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { sendMail } = require("../utils/transporter")

const userController = () => {};


// GET _______________________________________________________________________
userController.getAll = async (req, res) => {
    try {
        let users = await User.find()

        res.status(200)
        res.send({ success: true, users })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "Aucun utilisateur trouvé." })
    }
}

userController.get = async (req, res) => {
    try {
        let user = await User.findOne({
            username: req.params.userName
        })

        if (!user) throw new Error

        res.status(200)
        res.send({ success: true, user })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: "Aucun utilisateur trouvé." })
    }
}


// POST ______________________________________________________________________
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

userController.registerWithGoogle = async (req, res) => {
    const { username, googleId } = req.body;

    try {
        let existingUser = await User.findOne({
            $or: [
                { username: username },
                { googleId: googleId}
            ]
        })

        if (!username || !googleId || existingUser) throw new Error("Informations manquantes ou utilisateur existant.")

        let user = new User({
            username: username,
            googleId: googleId
        })

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
        console.log(err.message)
        res.status(400)
        res.send({ success: false, message: err.message })
    }
};

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

userController.loginWithGoogle = async (req, res) => {
    try {
        let user = await User.findOne({
            googleId: req.body.googleId
        })

        if (!user) throw new Error()

        let user_subscriptions = await UserSubscription.find({
            user: user
        }).populate("subscription")

        let token = getToken({_id: user._id})

        user.token = token

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

        if (user.token !== req.body.token) throw new Error

        let user_subscriptions = await UserSubscription.find({
            user: user
        }).populate({
            path: "subscription",
            populate: {
                path: "event"
            }
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
    try {
        let user = await User.findById(req.body.user_id)

        user.token = ""

        user.save()

        res.status(200)
        res.send({ success: true, message: "Déconnecté." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

userController.passwordRecovery = async (req, res) => {
    try {
        let user = await User.findOne({
            username: req.body.email
        })

        if (!user) throw new Error()

        let token = await getToken({ _id: user._id })

        await sendMail(
            "stefanosprosite@gmail.com",
            user.username,
            "Stefanos - Récupération de votre mot de passe",
            `Afin de récupérer votre mot de passe, merci de cliquer <a href='http://localhost:3000/auth/password-recovery/update/${token}'>ici</a>`
        )

        res.status(200)
        res.send({ success: true, message: "Lien de récupération envoyé.", token })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}


// PUT ______________________________________________________________________
userController.updateUsername = async (req, res) => {
    let new_username = req.body.new_username

    try {
        let existingUser = await User.findOne({
            username: new_username
        })

        if (existingUser) throw new Error("Nom d'utilisateur indisponible.")

        let user = await User.findByIdAndUpdate(req.params.userID, {
            username: new_username
        })

        if (!user) throw new Error

        res.status(200)
        res.send({ success: true, message: "Le nom d'utilisateur a été modifié." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

userController.updatePassword = async (req, res) => {
    try {
        let user = await User.findById(req.params.userID)

        if (!user) throw new Error

        await user.setPassword(req.body.new_password)

        user.save()

        res.status(200)
        res.send({ success: true, message: "Le mot de passe a été modifié." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}

userController.updateAdminStatus = async (req, res) => {
    try {
        let user = await User.findById(req.params.userID)

        if (!user) throw new Error("No user found.")

        await User.findByIdAndUpdate(req.params.userID, {
            admin: !user.admin
        })

        res.status(200)
        res.send({ success: true, message: "Le compte a été mis à jour." })
    } catch (err) {
        res.status(400)
        res.send({ success: false, message: err.message })
    }
}


// DELETE _____________________________________________________________________
userController.deleteAll = async (req, res) => {
    try {
        await User.deleteMany()
        await UserSubscription.deleteMany()

        res.status(200)
        res.send({ success: true, message: "Tous les utilisateurs ont été supprimés." })
    } catch (err) {
        res.sendStatus(400)
    }
}

userController.delete = async (req, res) => {
    try {
        let deletedUser = await User.findByIdAndDelete(req.params.userID)

        let subscriptions = await UserSubscription.find({
            user: deletedUser
        })

        subscriptions.map(async sub => {
            if (sub.stripeSubId !== null) {
                await stripe.subscriptions.del(sub.stripeSubId)
            }
            await UserSubscription.deleteOne({ _id: sub._id })
        })

        res.status(200)
        res.send({ success: true, message: "L'utilisateur a été supprimé." })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(400)
    }
}

module.exports = userController;