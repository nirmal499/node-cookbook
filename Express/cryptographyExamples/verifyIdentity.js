const crypto = require('crypto');
const fs = require('fs');
const decrypt = require('./decrypt');

// This is the data that we are receiving from the sender
const recievedData = require('./signMessage').packageOfDataToSend;

const hash = crypto.createHash(recievedData.algorithm);

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

/* The decryptedMessage is simply a hash value */
const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, recievedData.signedAndEncryptedData);
const decryptedMessageHex = decryptedMessage.toString();

/* Inorder to verify we need the hash of myData and then compare it with the decryptedMessage */
const hashOfOriginal = hash.update(JSON.stringify(recievedData.originalData));
const hashOfOriginalHex = hash.digest('hex');

if (hashOfOriginalHex === decryptedMessageHex) {
    console.log('Success! The data has not been tampered with and the sender is valid');
} else {
    console.log('Uh oh ... Someone is trying to manipulate the data or someone else is sending the data[sender is not valid]');
}

