const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ammachchicanteen_db',
    password: ''
});

module.exports = pool.promise();