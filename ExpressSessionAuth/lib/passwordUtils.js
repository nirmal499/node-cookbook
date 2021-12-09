const crypto = require('crypto');

function genPassword(password) {
    /* crypto.randomBytes(32) generates a random value and then convert it to hexadecimal string  */
    const salt = crypto.randomBytes(32).toString('hex');
    /* pbkdf2Sync generate a hash value of 64 length then convert it to hexadecimal string */
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt,
        hash: genHash
    };
}

function validatePassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;