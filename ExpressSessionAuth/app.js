const express = require('express');
//const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database');

// Package documentation - https://www.npmjs.com/package/connect-mongo
//const MongoStore = require('connect-mongo')(session);
const MySQLStore = require('express-mysql-session')(session);

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * -------------- SESSION SETUP ----------------
 */
const sessionStore = new MySQLStore({}/* session store options */, connection);
/* The sessions database table should be automatically created, when using default options.*/
app.use(session({
    /* Here secret says that if provided secret is invalid then the session is invalid too */
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    /* store specifies what persistance memory are we going use inorder to store our generated sessions */
    /* A session is used to store information about a particular user through out the browser */
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // expires after one day
    }
}));

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

/* It refreshes the passport middleware every single a route is accessed */
app.use(passport.initialize());
/* This has some relation with express-session and serializeUser and deserializeUser in config/passport  */
app.use(passport.session());

app.use((req, res, next) => {
    /* express-session is going to create req.session property */
    console.log(req.session);
    /* passport middleware is going to create req.user property */
    console.log(req.user);
    /* req.user will be available only after we log in. 
        serializeUser will be called and it will create the req.user property
    */
    next();
})


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);