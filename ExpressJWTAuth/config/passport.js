const fs = require('fs');
const path = require('path');
//const User = require('mongoose').model('User');
const JwtStrategy = require('passport-jwt').Strategy;
/* ExtractJwt: How we are going to extract jwt from the HTTP Request */
const ExtractJwt = require('passport-jwt').ExtractJwt;

const connection = require('./database');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// const passportJWTOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: PUB_KEY || secret_pharse,
//     issuer: 'Enter issuer here',
//     audience: 'Enter audience here',
//     algorithms: ['RS256'],
//     ignoreExpiration: false,
//     passReqToCallback: false,
//     jsonWebTokenOptions: {
//         complete: false,
//         clockTolerance: '',
//         maxAge: '2d', // 2 days
//         clockTimestamp: '100',
//         nonce: 'string here for OpenID'
//     }
// };

// TODO
const options = {
    /* HTTP request must have => Authorization: Brearer <jwt> */
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    /* We are passing PUB_KEY instead of PRIV_KEY becoz passport does the 
        verification[Identity whether the request user is a logged in user or not] */
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

/* Behind the scenes passport JwtStrategy is taking the `options` and as specified in the `options`, it is
    grabbing the jwt from authorization header, then its validating the jwt with jsonwebtoken library
    then once it validated it then it passes the payload object from jwt to the below payload argument
    then below we grab the id of user [payload.sub] then we look up in the database and then if found
    return it to passport and then passport attaches it to the Request.user object within the Express framework
*/
const strategy = new JwtStrategy(options, (payload, done) => {
    let sql = `SELECT * FROM User WHERE user_id=${payload.sub}`;
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error(error.message);
            return done(error, false);
        }
        if (results.length == 0) {
            /* No user if found */
            return done(null, false);
            /* Here we are telling passport that there are no errors represented by 'null'
                and also no username is found represented by 'false'
            */
        }

        const user = results[0];
        return done(null, user);
        //return done(null, user.username);
    });
})
/* Above logic will be called when we use `passport.authenticate('jwt', { session: false })` in 
    users.js `protected` route
*/


/* Whatever we define here is going to be called when we use passport.authenticate method on different routes */
module.exports = (passport) => {
    passport.use(strategy);
}