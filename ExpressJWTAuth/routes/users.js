//const mongoose = require('mongoose');
const mysql = require('mysql');
const router = require('express').Router();
//const User = mongoose.model('User');
const passport = require('passport');
const connection = require('../config/database');
const utils = require('../lib/utils');

// Using the passport.authenticate(..) middleware
router.get('/protected1', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are authorized" });
});

// Using out custom authenticate middleware [Similar implementation just as passport.authenticate(..) middleware]
router.get('/protected2', utils.authMiddleware, (req, res, next) => {
    //console.log(req.jwt);
    res.status(200).json({ success: true, msg: "You have successfully authenticated to this route" });
});

// TODO
router.post('/login', function (req, res, next) {
    /* username is PRIMARY KEY */
    let sql = `SELECT * FROM UserJWT WHERE username='${req.body.username}'`;
    //console.log(sql);
    connection.query(sql, (error, results, fields) => {
        if (error) {
            //console.error(error.message);
            return next(err);
        }
        if (results.length == 0) {
            /* No user found */
            res.status(401).json({ success: false, msg: "Could not find user" });
            //console.log("Results", results);
            return;
        }

        /* results will contain only one element */
        const user = results[0];
        //console.log(user);
        const isValid = utils.validatePassword(req.body.password, user.hash, user.salt);
        if (isValid) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

        } else {
            res.status(401).json({ success: false, msg: "You entered the wrong password" });
        }
    });
});

// TODO
router.post('/register', function (req, res, next) {
    const saltHash = utils.genPassword(req.body.pw);

    const { salt, hash } = saltHash;

    // insert statment
    let sql = `INSERT INTO UserJWT(username,hash,salt)
           VALUES('${req.body.uname}','${hash}','${salt}')`;

    // execute the insert statment
    connection.query(sql, (err, results, fields) => {
        if (err) {
            return next(err);
            // return console.error(err.message);
            // console.log("ERROR1");

        }
        //Insert was successful
        let sql2 = `SELECT * FROM UserJWT WHERE username='${req.body.uname}'`;
        connection.query(sql2, (err, results, fields) => {
            if (err) {
                return next(err);
                // console.log("ERROR2");
            }
            // Retrieve was successful
            const user = results[0];

            const jwt = utils.issueJWT(user);
            res.json({
                success: true,
                user: user,
                token: jwt.token,
                expiresIn: jwt.expires
            })
        })
    });

    //res.redirect('/login');
});

module.exports = router;