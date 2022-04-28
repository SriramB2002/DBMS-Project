const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { body, validationResult } = require('express-validator');
app.use(express.urlencoded());
app.use(express.json());

const securePassword = (password) =>{
    const passwordHashed = bcrypt.hashSync(password,10);
    return passwordHashed;
}

function authenticate(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token==null){
        return res.status(404).send('Access denied');
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            console.log(err);
            return res.status(404).send('Access denied');
        }
        req.user = user;
        next();
    });
}

router.get('/getProfile', authenticate, (req, res) => {
    // res.json(req.user);
    db.query('SELECT * from user where user_id=?',[req.user.user.user_id],function(err,results,fields){
        if(err){
            res.status(422).json({
                message:err.message
            });
            return;
        }
        res.json(results);
    });
})

router.post('/updateBalance',authenticate,(req, res) => {
    console.log(req.user.user.email);
    db.query('UPDATE user SET balance = balance + ? WHERE email=?', [req.body.val, req.user.user.email], function(err, results) {
        res.json(results);
    });
});

router.post('/updateDetails', authenticate, (req, res) => {
    const password = securePassword(req.body.password);
    db.query('UPDATE user SET password=?, first_name=?, last_name=? WHERE email=?', [password, req.body.first_name, req.body.last_name, req.user.user.email], function(err, results) {
        if(err){
            console.log(err);
            res.status(422).json({
                message:err.message
            });
            return;
        }
        res.json(results);
    });
});

module.exports = router;