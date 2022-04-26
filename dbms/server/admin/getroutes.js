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
router.get("/availableseats/:id",function(req,res)
{
    db.query('select s.seat_id,s.stadium_id,s.seat_type,s.seat_price, st.stadium_name, st.capacity, st.city, st.country from seats s, new_schema.match m, stadium st where m.stadium_id = s.stadium_id and s.stadium_id = st.stadium_id and match_id=? and s.seat_id'+
    ' Not IN(select s.seat_id from book_seats s, new_schema.match m, booking b where b.booking_id=s.booking_id and '+
    'm.match_id = b.match_id and m.match_id = ?)',
    [req.params.id,req.params.id],
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
    db.query('SELECT * FROM new_schema.match where date_time>now();',function(err,results,fields)
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

//getUpcomingMatches By Stadium
router.get('/upcomingmatches/:stadium_id',function(req,res)
{
    db.query('SELECT * FROM new_schema.match where date_time>now() and stadium_id=?',[req.params.stadium_id],function(err,results,fields)
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
    db.query('SELECT * FROM new_schema.match',function(err,results,fields)
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

router.post('/getTeam', (req, res) => {
    db.query('SELECT * FROM teams WHERE team_id=?', [req.body.team_id], function(err, results) {
        res.json(results);
    })
});

router.get('/getFood', (req, res) => {
    db.query('SELECT * FROM food_item', function(err, results) {
        res.json(results);
    })
})

router.get('/getMerch', (req, res) => {
    db.query('SELECT * FROM merch', function(err, results) {
        res.json(results);
    })
})

router.get('/getallteams', (req, res) => {
    db.query('SELECT * FROM teams', (err, results) => {
        res.json(results);
    })
})


router.get('/getstadium/:id', (req, res) => {
    db.query('SELECT * FROM stadium where stadium_id=?',[req.params.id],function(err,results,fields)
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
})

module.exports = router;