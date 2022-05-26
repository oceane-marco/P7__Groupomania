const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});



connection.connect(function (err) {
  if (err) {
    throw err
  }
  console.log("Connection to Mysql is valid");
});

module.exports = connection;