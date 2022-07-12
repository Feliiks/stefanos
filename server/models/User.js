const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const UserSchema = new Schema({
    username: {
        type: String,
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

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema, "users")