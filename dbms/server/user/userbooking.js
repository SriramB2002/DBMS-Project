const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken');
app.use(express.urlencoded());
app.use(express.json());
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null) {
        return res.status(404).send('Access denied');
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(404).send('Access denied');
        }
        req.user = user;
        next();
    });
}
//get items to buy in cart for frontend to show
router.get('/food/avail', (req, res) => {
    db.query('SELECT food_name , food_price FROM food_item', function (err, results, fields) {
        res.status(200).json(results);
    });
});
//get merch list for user to buy for frontend to show
router.get('/merch/avail', (req, res) => {
    db.query('SELECT merch_name , merch_price , merch_image from merch', function (err, results, fields) {
        res.status(200).json(results);
    });
});
function bookseats(booking_id, seat_id) {
    db.query('INSERT INTO book_seats (booking_id , seat_id ) VALUES (?,?)', [booking_id, seat_id], function (err, results) {
        if (err) {
            console.log(err.message);
            console.log("chalja bhai");
        }
    });
};
function addfood(booking_id, food_id, quantity) {
    db.query('INSERT INTO booking_food (booking_id , food_id , quantity) VALUES (?,?,?)', [booking_id, food_id, quantity], function (err) {
        if (err) console.log(err.message);
    });
}
function addMerch(booking_id, merch_id, quantity) {
    db.query('INSERT INTO booking_merch (booking_id , merch_id , quantity) VALUES (?,?,?)', [booking_id, merch_id, quantity], function (err) {
        if (err) console.log(err.message);
    });
}
router.post('/createBooking', authenticate, (req, res) => {
    let total = 0;
    db.query('SELECT stadium_id FROM NEW_SCHEMA.MATCH WHERE match_id=?', [req.body.match_id], function (err, currentStadiumID) {
        // console.log(currentStadiumID[0].stadium_id);
        for (let i = 0; i < req.body.seats.length; i++) {
            total += parseInt(req.body.seats[i].seat_price);
        }
        req.body.merch_list.forEach(i => {
            total += i.merch_price * i.merch_quantity;
        });
        req.body.food_list.forEach(i => {
            total += i.food_price * i.food_quantity;
        });
        console.log(req.user);
        db.query('SELECT balance from USER where user_id = ?', [req.user.user.user_id], function (err, results) {
            if (err) {
                return;
            }
            if (total > results[0].balance)
                res.json("Insufficient Balance");
            else {
                db.query('UPDATE user SET balance = balance - ? where user_id = ?', [total, req.user.user.user_id], function (err, results) {
                    if (err) {
                        return;
                    }
                });
                db.query('INSERT INTO BOOKING (booking_id,user_id,match_id) VALUES(?,?,?)', [req.body.booking_id, req.user.user.user_id, req.body.match_id], function (err, results, fields) {
                    if (err) {
                        res.status(422).json({
                            message: err.message
                        });
                        return;
                    }
                    let seats = req.body.seats;
                    db.query("SELECT LAST_INSERT_ID() as val", function (err, results) {
                        for (var i = 0; i < seats.length; i++) {
                            bookseats(results[0].val, seats[i].seat_id);
                        }
                        for (var i = 0; i < req.body.merch_list.length; i++) {
                            addMerch(results[0].val, req.body.merch_list[i].merch_id, req.body.merch_list[i].merch_quantity);
                        }
                        for (var i = 0; i < req.body.food_list.length; i++) {
                            addfood(results[0].val, req.body.food_list[i].food_id, req.body.food_list[i].food_quantity);
                        }
                    });
                    res.json("BOOKED SUCCESSFULLY");
                });
            }
        });
    });
});

function getMatchId(bid) {
    let mid = [];
    for (let i = 0; i < bid.length; i++) {
        db.query('SELECT match_id FROM booking WHERE booking_id=?', [bid[i]], function(err, results) {
            mid.push(results[0].match_id);
        })
    }
    return mid;
}

router.post('/getBookings', authenticate, (req, res) => {
    db.query('SELECT booking_id FROM booking WHERE user_id=?', [req.user.user.user_id], function(err, results) {
        let bid = [];
        for (let i = 0; i < results.length; i++)
        {
            let bookingId = results[i].booking_id;
            console.log(results[i].booking_id);
            db.query('SELECT match_id FROM booking WHERE booking_id=?', [bookingId], function(err1, results1) {
                let matchId = results1[0].match_id;
                console.log(matchId)
                db.query('SELECT * FROM new_schema.match WHERE match_id=?', [matchId], function(err2, results2) {
                    console.log(results2);
                    let stadiumId = results2[0].stadium_id;
                    let team1 = results2[0].team1_id;
                    let team2 = results2[0].team2_id;
                    db.query('SELECT stadium_name, city FROM stadium WHERE stadium_id=?', [stadiumId], function(err3, results3) {
                        console.log(results3[0].stadium_name, results3[0].city);
                    })
                    db.query('SELECT team_name FROM teams WHERE team_id=?', [team1], function(err3, results3) {
                        console.log(results3[0].team_name);
                    })
                    db.query('SELECT team_name FROM teams WHERE team_id=?', [team2], function(err3, results3) {
                        console.log(results3[0].team_name);
                    })
                });
            })
        }
        console.log(bid);
        res.json(results);
    });
});

module.exports = router;