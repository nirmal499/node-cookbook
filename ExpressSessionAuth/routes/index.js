const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const isAuth = require('../routes/authMiddleware').isAuth;
// const User = connection.models.User;

/**
 * -------------- POST ROUTES ----------------
 */

/* {failureRedirect:'/login-failure',successRedirect:'login-success'} tells passport where to redirect based on the status of the login 
    passport will use the verifyCallback function to find the returned value of login
*/
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }), (req, res, next) => { });

// TODO
router.post('/register', (req, res, next) => {

    const saltHash = genPassword(req.body.pw);

    const { salt, hash } = saltHash;

    // insert statment
    let sql = `INSERT INTO User(username,hash,salt)
           VALUES('${req.body.uname}','${hash}','${salt}')`;

    // execute the insert statment
    connection.query(sql, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        // get inserted id
        //console.log('User Id: ' + results.insertId);
    });

    res.redirect('/login');

});


/**
* -------------- GET ROUTES ----------------
*/

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
// router.get('/protected-route', (req, res, next) => {

//     // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
//     if (req.isAuthenticated()) {
//         /* isAuthenticated() is a inbuilt function provided by passport
//             This function checks Request.Session.passport.user exists or not. IF it exists then
//             it returns true otherwise false
//         */
//         res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
//     } else {
//         res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
//     }
// });
router.get('/protected-route', isAuth, (req, res, next) => {

    res.send('You made it to the route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    /* logout() is the inbuilt function given by passport which is going to delete Request.Session.passport.user */
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;