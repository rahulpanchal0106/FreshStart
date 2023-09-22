const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname,'..','public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
})
app.get('/*',(req,res)=>{
    res.status(400).json({
        "error":"The page does not exists"
    })
})
app.get('/profile',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','profile.html'));
})

module.exports= app;