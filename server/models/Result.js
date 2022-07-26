const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Result = mongoose.model("Result", new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    value: {
        type: String,
    },
    icon: {
        type: String
    }
}), "results")


module.exports = Result