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
router.post('/login',(req,res)=>{
    db.query('SELECT * FROM ADMIN WHERE username=? AND password=?',[req.body.username,req.body.password],function(err,results,fields){
        res.json({user:results[0]});
    });
});
module.exports = router;