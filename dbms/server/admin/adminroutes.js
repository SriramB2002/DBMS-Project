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

router.post('/addteams',(req,res)=>{
    db.query('INSERT INTO TEAMS (team_id,team_name,team_flag) VALUES (?,?,?)',
                [req.body.team_id,req.body.team_name,req.body.team_flag],
                function(err,results,fields){
                    if(err)
                    {
                        return done(err);
                    }
                res.json({teams:results[1]});
    });
});

module.exports = router;