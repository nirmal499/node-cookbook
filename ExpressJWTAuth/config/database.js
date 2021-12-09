//const mongoose = require('mongoose');
const mysql = require('mysql');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect(function (err) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("MYSQL Connected");
    let createTodos = `create table if not exists UserJWT(
        user_id int unsigned primary key auto_increment,
        username varchar(20) not null,
        hash varchar(255) not null,
        salt varchar(255) not null,
        unique(username)
    )`;

    connection.query(createTodos, function (err, results, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
    });
});

module.exports = connection;







/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */

// const devConnection = process.env.DB_STRING;
// const prodConnection = process.env.DB_STRING_PROD;

// // Connect to the correct environment database
// if (process.env.NODE_ENV === 'production') {
//     mongoose.connect(prodConnection, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     mongoose.connection.on('connected', () => {
//         console.log('Database connected');
//     });
// } else {
//     mongoose.connect(devConnection, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     mongoose.connection.on('connected', () => {
//         console.log('Database connected');
//     });
// }
