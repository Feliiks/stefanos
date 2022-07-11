require('dotenv').config({ path: '.env' });
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport')
const session = require("express-session")

require("./utils/database")

const mainRouter = require('./router');


// SERVER CONFIG _____________________________________________________
const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Le serveur est lancé sur le port ${process.env.PORT} en ${process.env.NODE_ENV} mode.`);
});

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../client/build"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

require("./strategies/localStrategy");

// ROUTES ___________________________________________________________

app.use(mainRouter);