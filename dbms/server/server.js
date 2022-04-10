const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { urlencoded } = require('body-parser');
const { body, validationResult } = require('express-validator');
// const sequelize = require('./db/sequelize');
const app = express();
app.use(express.urlencoded());
app.use(express.json());


app.get('/',(req,res)=>{
    db.query('SELECT * FROM USERDB',function(err, results, fields){
        console.log(results);
         // results contains rows returned by server
    });
});
//Register

const securePassword = (password) =>{
    const passwordHashed = bcrypt.hashSync(password,10);
    return passwordHashed;
}

app.post('/register',[body('email').isEmail(),body('password').isStrongPassword()],(req,res)=>{
    //Express Validator
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    //BCrpyt
    const password = securePassword(req.body.password);
    console.log("This is " + password);
    //DB
    db.query('INSERT INTO USER (user_id,email,password,first_name,last_name) VALUES (?,?,?,?,?)',[req.body.user_id,req.body.email,password,req.body.first_name,req.body.last_name],function(err, results, fields){
        if(err){
            res.status(422).json({
                message:err.message
            });
            return;
        }
        db.query('SELECT * FROM USER',function(err, results, fields){
            res.json(results);
        });
    });

});
app.post('/login',(req,res)=>{
    db.query('SELECT * FROM USER WHERE email=? AND password=?',[req.body.email,req.body.password],function(err,results,fields){
        res.json({user:results[0]});
    });
});
app.get('/users',(req,res)=>{
    res.json("Hello");
});
app.post('/add-user',(req,res)=>{
   res.redirect('/users');
});
app.listen(8080);
