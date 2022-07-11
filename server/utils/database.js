const mongoose = require("mongoose");

const url = process.env.DB_URL;

try {
    mongoose.connect(url);

    console.log("connected to db");
} catch (err) {
    console.log(err);
}