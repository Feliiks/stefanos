const User = require('../models/User')
const { getToken, getRefreshToken, COOKIE_OPTIONS } = require('../authenticate')
const passport = require('passport')

const userController = () => {};

userController.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !password) throw new Error("Informations manquantes.")

        let user = new User({
            username: username
        })

        await User.register(user, password)

        let token = getToken({_id: user._id})
        let refreshToken = getRefreshToken({_id: user._id})

        user.refreshToken.push({ refreshToken })

        await user.save()

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        res.send({ success: true, user, token })
    } catch (err) {
        res.send({ success: false, message: err.message })
    }
};


userController.login = async (req, res) => {
    let token = getToken({_id: req.user._id})
    let refreshToken = getRefreshToken({_id: req.user._id})

    try {
        let user = await User.findById(req.user._id)

        user.refreshToken.push({ refreshToken })

        await user.save()

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        res.send({ success: true, user, token })
    } catch (err) {
        res.send({ success: false, message: err.message })
    }
}

userController.logout = async (req, res) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies

    try {
        let user = await User.findById(req.user._id)

        let tokenIndex = user.refreshToken.findIndex(
            item => item.refreshToken === refreshToken
        )

        await user.save()

        res.clearCookie("refreshToken", COOKIE_OPTIONS)
        res.send({ success: true })
    } catch (err) {
        res.sendStatus(500)
    }
}

module.exports = userController;