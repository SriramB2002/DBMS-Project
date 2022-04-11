const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
app.use(express.urlencoded());
app.use(express.json());
const securePassword = (password) =>{
    const passwordHashed = bcrypt.hashSync(password,10);
    return passwordHashed;
}
router.post('/register',[body('email').isEmail(),body('password').isStrongPassword()],(req,res)=>{
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
router.post('/login',(req,res)=>{
    db.query('SELECT * FROM USER WHERE email=? AND password=?',[req.body.email,req.body.password],function(err,results,fields){
        res.json({user:results[0]});
    });
});
module.exports = router;