/* Here we use the jsonwebtoken library */
const jwt = require('jsonwebtoken');
const fs = require('fs');

const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf8');
const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf8');

const payloadObj = {
    sub: '123456890',
    name: 'John Doe',
    admin: true,
    iat: 1516239022
}

/* creating a jwt. We just have to provide the payload and the algorithm.
    Then it can automatically figures out the header by itself.
*/
const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256' });

console.log(signedJWT);

/* verifying the jwt */
jwt.verify(signedJWT, PUB_KEY, { algorithms: ['RS256'] }, (err, payload) => {
    if (err) {
        throw err;
    }
    console.log(payload);
});