const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: [Session],
    },
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)