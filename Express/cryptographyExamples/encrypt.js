const crypto = require('crypto');

/* If we want to protect data not an identity , we encrypt with the public key and decrypt with the private key */
function encryptWithPublicKey(publicKey, message) {

    const bufferMessage = Buffer.from(message, 'utf8');

    return crypto.publicEncrypt(publicKey, bufferMessage);
}

/* encryptWithPrivateKey is used for Digital Signature [Identity Verification] */
function encryptWithPrivateKey(privateKey, message) {
    const bufferMessage = Buffer.from(message, 'utf8');

    return crypto.privateEncrypt(privateKey, bufferMessage);
}

module.exports.encryptWithPublicKey = encryptWithPublicKey;
module.exports.encryptWithPrivateKey = encryptWithPrivateKey;
