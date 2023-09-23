const mysql = require('mysql2')

const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "user_database"
});

const con = async ()=>{
    await connection.connect(function(error){
        if (error) throw error
        else console.log("connected to the database successfully!");
    });

}


function getUsers(){
    //will get users from db
}
function getUser(id){
    //will get only one user
}
function createUser(){

}


// async function getUsers() {
//   const [rows] = await pool.query("SELECT * FROM notes")
//   return rows
// }

// async function getUser(id) {
//   const [rows] = await pool.query(`
//   SELECT * 
//   FROM notes
//   WHERE id = ?
//   `, [id])
//   return rows[0]
// }

// async function createUser(title, contents) {
//   const [result] = await pool.query(`
//   INSERT INTO notes (title, contents)
//   VALUES (?, ?)
//   `, [title, contents])
//   const id = result.insertId
//   return getNote(id)
// }

module.exports = {
    con,
    connection,
    getUsers,
    getUser,
    createUser
}