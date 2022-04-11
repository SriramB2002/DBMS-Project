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
                    if(err){
                        res.status(422).json({
                            message:err.message
                        });
                        return;
                    }
                res.json("Added");
    });
});

//Add Stadium to database
router.post('/addstadium',(req,res)=>{
    db.query('INSERT INTO STADIUM (stadium_id,stadium_name,capacity,city,country) VALUES (?,?,?,?,?)',
                [req.body.stadium_id,req.body.stadium_name,req.body.capacity, req.body.city, req.body.country],
                function(err,results,fields){
                    if(err){
                        res.status(422).json({
                            message:err.message
                        });
                        return;
                    }
                    res.json("Added");
    });
});

//Adds match to database
router.post('/match',(req,res)=>{
    if(req.body.team1_id==req.body.team2_id)
    {
        res.status(400).json("Team id cannot be equal");
        return;
    }
    db.query('INSERT INTO DBS.MATCH (match_id, match_format, match_type, date_time, stadium_id, team1_id, team2_id) VALUES (?,?,?,?,?,?,?);',
        [req.body.match_id,req.body.match_format,req.body.match_type, req.body.date_time, req.body.stadium_id, req.body.team1_id, req.body.team2_id],
                function(err,results,fields){
                    if(err){
                        res.status(422).json({
                            message:err.message
                        });
                        return;
                    }
                    res.json("Success");
    });
});

//Add food item
router.post('/addfood',(req,res)=>
{
    db.query('INSERT INTO FOOD_ITEM (food_id,food_name,food_price) values(?,?,?)',
        [req.body.food_id,req.body.food_name,req.body.food_price],
            function(err,results,fields )
            {
                if(err){
                    res.status(422).json({
                        message:err.message
                    });
                    return;
                }
                res.json("Success")
            });
});

router.post('/updatefood',(req,res)=>
{
    db.query('UPDATE food_item SET food_price = ? WHERE food_id = ?', [req.body.newprice, req.body.food_id],
    function(err,results,fiels)
    {
        if(err){
            res.status(422).json({
                message:err.message
            });
            return;
        }
        res.json("Success")
    });
})

router.post('/addmerch',(req,res)=>
{
    db.query('INSERT INTO MERCH (merch_id,merch_name,merch_image,merch_price) values(?,?,?,?)',
        [req.body.merch_id,req.body.merch_name,req.body.merch_image,req.body.merch_price],
            function(err,results,fields )
            {
                if(err){
                    res.status(422).json({
                        message:err.message
                    });
                    return;
                }
                res.json("Success")
            });
});

router.post('/updatemerch',(req,res)=>
{
    db.query('UPDATE merch SET merch_price = ? WHERE merch_id = ?', [req.body.newprice, req.body.merch_id],
    function(err,results,fiels)
    {
        if(err){
            res.status(422).json({
                message:err.message
            });
            return;
        }
        res.json("Success")
    });
})

module.exports = router;