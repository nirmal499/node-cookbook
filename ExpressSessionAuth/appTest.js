const mysql = require('mysql');

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodejsuser',
    password: '(24fG$#[f$BqZdT=',
    database: 'nodejsuserdb'
});

connection.connect((err) => {
    if (err) {
        return console.error('Error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');

    let createTodos = `create table if not exists UserTest(
        username varchar(20) primary key,
        hash varchar(255) not null,
        salt varchar(255) not null
    )`;

    connection.query(createTodos, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

});

let sql2 = `INSERT INTO UserTest(username,hash,salt)
           VALUES('Nirmal4','iuhiud73','76^%&&^jhs')`;
connection.query(sql2, (err, results, fields) => {
    if (err) {
        return console.error(error.message);
    }
    console.log("Results: ", results);

    /* Results:  OkPacket {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
    }
 */
})

// let sql = `SELECT * FROM UserTest`;
// connection.query(sql, (error, results, fields) => {
//     if (error) {
//         return console.error(error.message);
//     }
//     //console.log(results);
//     results.map((data) => {
//         console.log(data.username);
//     })
// });




// connection.end();

