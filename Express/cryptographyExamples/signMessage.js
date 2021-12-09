/* So Here we are going to see how DIGITAL SIGNATURE WORKS */
/* With DIGITAL SIGNATURE we have some sort of data that we want to put our signature on
    think of it like a legal document. You have the document itself with the data and you want to sign it
    And you want to make sure that the reciever of that data is assured that both the data that was on the
    legal document have not been tampered and also want to make sure that the person we think signed it actually did
    signed it.
*/
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const myData = {
    firstName: 'Nirmal',
    lastName: 'Baskey',
    socialSecurityNumber: 'NO NO NO. Never put personal info in a digitally signed \
    message since this form of cryptography does not hide the data!'
};


/* Step1: We need to sign the message[myData] */

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);

// Sets the value on the hash object: requires string format, so we must convert myData to String
hash.update(myDataString);

// Hashed data in Hexadecimal format
const hashedData = hash.digest('hex');

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');
/* Sender owns a private key with which he/she will sign the data.
    Sender will sign the hash data not the original myData */
const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

/* Step2: Verification to be done by the reciever, So reciever needs the myData to verify that
    whether the signedData is tampered or not and whether the signedData is actually signed or not
*/
const packageOfDataToSend = {
    algorithm: 'sha256', // This tell the reciever which algorithm was used to hash myData
    originalData: myData, // Original myData
    signedAndEncryptedData: signedMessage // signed myData 
};

/* packageOfDataToSend will be needed by reciever of our signedMessaga to verify whether the
    signedMessage is tampered or not and whether the signedMessage is actually signed to not
*/
module.exports.packageOfDataToSend = packageOfDataToSend;

