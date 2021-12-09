const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const validatePassword = require('../lib/passwordUtils').validatePassword;
//const User = connection.models.User;

// TODO: passport.use();

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw',
};

/* Here we expect username and password from '/login' request*/
const verifyCallback = (username, password, done) => {

    /* username is PRIMARY KEY */
    let sql = `SELECT * FROM User WHERE username='${username}'`;
    //console.log(sql);
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error.message);
            return done(error);
        }
        if (results.length == 0) {
            /* Here we are telling passport that there are no errors represented by 'null'
                and also no username is found represented by 'false'
            */
            return done(null, false);
        }

        /* results will contain only one element */
        const user = results[0];
        //console.log(user);
        const isValid = validatePassword(password, user.hash, user.salt);
        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

/* serializeUser creates a user property in req wth value containing user_id */
passport.serializeUser((user, done) => {
    //console.log(user.user_id);
    done(null, user.user_id);
});

/* Here the userId is the Request.Session.passport.user
    When userId is undefined [means Request.Session.passport.user property does not exists]
    then deserializeUser is not executed.
    Only when userId has some value then only deserializeUser function is executed by passport
*/
passport.deserializeUser((userId, done) => {
    let sql = `SELECT * FROM User WHERE user_id=${userId}`;
    //console.log(sql);
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error.message);
            return done(error);
        }
        if (results.length == 0) {
            /* Here we are telling passport that there are no errors represented by 'null'
                and also no username is found represented by 'false'
            */
            return done(null, false);
        }

        const user = results[0];
        return done(null, user);
        //return done(null, user.username);
    });
})

/* Session {
  cookie: {
    path: '/',
    _expires: 2021-12-08T15:27:33.017Z,
    originalMaxAge: 86400000,
    httpOnly: true
  }
}
undefined
Session {
  cookie: {
    path: '/',
    _expires: 2021-12-08T15:27:33.017Z,
    originalMaxAge: 86400000,
    httpOnly: true
  }
}
undefined
Session {
  cookie: {
    path: '/',
    _expires: 2021-12-08T15:30:10.463Z,
    originalMaxAge: 86400000,
    httpOnly: true
  },
  passport: { user: 1 }
}
nbaskey
 */

/* Ater 'login' route is successful then Request.Session.passport.user will be created and
    After 'logout' route happens then Request.Session.passport.user property will be removed
*/