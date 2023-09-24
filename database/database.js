const mysql = require('mysql2')

const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});


connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!");
});

module.exports = {
    connection,
   
}