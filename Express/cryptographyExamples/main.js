const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');


const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');

/* Stores a Buffer object */
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, 'Super secret message');

/* If you try and "crack the code", you will just get gibberish */
console.log(encryptedMessage.toString());

/* Now we will decrypt the encryptedMessage with the private key*/
const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

/* Convert the Buffer to a string and print the message */
console.log(decryptedMessage.toString());

