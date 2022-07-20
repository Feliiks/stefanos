const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: ""
    },
    googleId: {
        type: String,
        default: null
    }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema, "users")