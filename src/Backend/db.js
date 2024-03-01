const Pool = require("pg").Pool;     //PostgreSQL

const pool = new Pool({
    user: "wei",
    password: "12345",
    host: "localhost",
    port: 5432,
    database: "todo",
});

pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = pool;

