const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken');
app.use(express.urlencoded());
app.use(express.json());

//get items to buy in cart
router.get('/food/avail',(req,res) => {
    db.query('SELECT food_name , food_price FROM food_item', function(err,results,fields){
        res.status(200).json(results);
    });
});
//get merch list for user to buy
router.get('/merch/avail' , (req,res)=>{
    db.query('SELECT merch_name , merch_price , merch_image from merch' , function(err,results,fields){
        res.status(200).json(results);
    });
});
module.exports = router;