const passport = require("passport")
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"

exports.getToken = user => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)
    })
}

exports.verifyUser = passport.authenticate("jwt", { session: false })