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
    let createTodos = `create table if not exists User(
        user_id int unsigned primary key auto_increment,
        username varchar(20) not null,
        hash varchar(255) not null,
        salt varchar(255) not null,
        unique(username)
    )`;

    connection.query(createTodos, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
});

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

// const conn = process.env.DB_STRING;

// const connection = mongoose.createConnection(conn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
// const UserSchema = new mongoose.Schema({
//     username: String,
//     hash: String,
//     salt: String
// });


// const User = connection.model('User', UserSchema);


// Expose the connection
module.exports = connection;