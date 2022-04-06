const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db');
const { urlencoded } = require('body-parser');
// const sequelize = require('./db/sequelize');
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.get('/',(req,res)=>{
    db.query('SELECT * FROM USER',function(err, results, fields){
        console.log(results); // results contains rows returned by server
    });
});
app.post('/register',(req,res)=>{
    console.log("Hello");
    res.json(req.body);
    db.query('INSERT INTO USER (user_id,user_name,user_email,user_password) VALUES (?,?,?,?)',[req.body.user_id,req.body.user_name,req.body.user_email,req.body.user_password],function(err, results, fields){
        console.log(results); // results contains rows returned by server
    });
});
app.get('/users',(req,res)=>{
    res.render();
});
app.post('/add-user',(req,res)=>{
   res.redirect('/users');
});
app.listen(8080);
