const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/db');
const { body, validationResult } = require('express-validator');
app.use(express.urlencoded());
app.use(express.json());

//details of all stadium
router.get("/stadiums",function(req,res)
{
    db.query("select * from stadium", 
    function(err,results,fields )
    {
        if(err){
            res.status(422).json({
                message:err.message
            });
            return;
        }
        res.json(results);
    });

});
//get All Seats in a stadium
router.post("/availableseats",function(req,res)
{
    db.query('select s.seat_id,s.stadium_id,s.seat_type,s.seat_price from seats s, dbs.match m where m.stadium_id = s.stadium_id and match_id=? and s.seat_id'+
    ' Not IN(select s.seat_id from book_seats s, dbs.match m, booking b where b.booking_id=s.booking_id and '+
    'm.match_id = b.match_id and m.match_id = ?)',
    [req.body.match_id,req.body.match_id],
    function(err,results,fields)
    {
        if(err){
            res.status(422).json({
                message:err.message
            });
            return;
        } 
        res.json(results);
    });
});

//getUpcomingMatches
router.get('/upcomingmatches',function(req,res)
{
    db.query('SELECT * FROM dbs.match where date_time>now();',function(err,results,fields)
    {
        if(err)
        {
            res.status(422).json({
                message:err.message
            });
            return;
        }
        res.json(results);
    });
});

//To get All matches
router.get('/allmatches',function(req,res)
{
    db.query('SELECT * FROM dbs.match',function(err,results,fields)
    {
        if(err)
        {
            res.status(422).json({
                message:err.message
            });
            return;
        }
        res.json(results);
    });
});

module.exports = router;