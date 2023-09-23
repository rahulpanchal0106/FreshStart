const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser');
const { connection, getUsers, getUser, createUser } = require('./database/database.js');
const app = express();

app.use(morgan('combined'));

app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'));
})
app.get('/profile',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','profile.html'));
})
app.get('/registration',(req,res)=>{
    //res.sendFile(path.join(__dirname,'public','registration.html'));
    res.sendFile(path.join(__dirname,'public','registrationDummy.html'));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'));
})

app.post('/registration',(req,res)=>{
    console.log(req.body);
    const email = req.body.email;
    const pass = req.body.pass;
    connection.connect(function(error){
        if (error) throw error;
        var sql = "INSERT INTO users(email,password) VALUES('"+email+"','"+pass+"') "
        connection.query(sql,function(error,result){
            if (error) throw error;
            res.sendFile(path.join(__dirname,'public','index.html'));

        })
        
    })
    
});

// app.get("/users", (req, res) => {
//     const notes = getUsers()
//     res.send(notes)
// })
  
// app.get("/users/:id", (req, res) => {
//   const id = req.params.id
//   const note = getUser(id)
//   res.send(note)
// })

// app.post("/users", async (req, res) => {
//   const { title, contents } = req.body
//   const note = createUser(title, contents)
//   res.status(201).send(note)
// })
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke !')
})
// app.get('/*',(req,res)=>{
//   res.status(400).json({
//       "error":"The page does not exists"
//   })
// })
module.exports= app;