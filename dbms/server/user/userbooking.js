const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const shortid = require('shortid');
app.use(express.urlencoded());
app.use(express.json());

const razorpay = new Razorpay({
	key_id: 'rzp_test_ZdRXkONBVZeKRJ',
	key_secret: 'Gxb2X8hnj3irWyfe3fPkDyYq'
})

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
//get merch list for user to buy for frontend to show
router.get('/merch/avail', (req, res) => {
    db.query('SELECT merch_name , merch_price , merch_image,merch_id from merch', function (err, results, fields) {
        res.status(200).json(results);
    });
});
function bookseats(booking_id, seat_id) {
    db.query('INSERT INTO book_seats (booking_id , seat_id ) VALUES (?,?)', [booking_id, seat_id], function (err, results) {
        if (err) {
            console.log(err.message);
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
router.post('/createBookingBalance', authenticate, (req, res) => {
    let seat_total = 0;
    let food_total = 0;
    let merch_total = 0;
    db.query('SELECT stadium_id FROM new_schema.MATCH WHERE match_id=?', [req.body.match_id], function (err, currentStadiumID) {
        // console.log(currentStadiumID[0].stadium_id);
        // console.log(req.body);
        for (let i = 0; i < req.body.seats.length; i++) {
            seat_total += parseInt(req.body.seats[i].seat_price);
        }
        req.body.merch_list.forEach(i => {
            merch_total += i.merch_price * i.merch_quantity;
        });
        req.body.food_list.forEach(i => {
            food_total += i.food_price * i.food_quantity;
        });
        console.log(req.user);
        db.query('SELECT balance from USER where user_id = ?', [req.user.user.user_id], function (err, results) {

            if (err) {

                return;
            }
            if (seat_total + food_total + merch_total > results[0].balance)
                res.json("Insufficient Balance");
            else {
                db.query('UPDATE user SET balance = balance - ? where user_id = ?', [seat_total+food_total+merch_total, req.user.user.user_id], function (err, results) {
                    if (err) {
                        return;
                    }
                });
                db.query('INSERT INTO BOOKING (booking_id,user_id,match_id,seat_total,merch_total,food_total) VALUES(?,?,?,?,?,?)', [req.body.booking_id, req.user.user.user_id, req.body.match_id,seat_total,merch_total,food_total], function (err, results, fields) {
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

router.post('/createBookingRazorpay', authenticate, (req, res) => {
    let seat_total = 0;
    let food_total = 0;
    let merch_total = 0;
    db.query('SELECT stadium_id FROM new_schema.MATCH WHERE match_id=?', [req.body.match_id], function (err, currentStadiumID) {
        // console.log(currentStadiumID[0].stadium_id);
        // console.log(req.body);
        for (let i = 0; i < req.body.seats.length; i++) {
            seat_total += parseInt(req.body.seats[i].seat_price);
        }
        req.body.merch_list.forEach(i => {
            merch_total += i.merch_price * i.merch_quantity;
        });
        req.body.food_list.forEach(i => {
            food_total += i.food_price * i.food_quantity;
        });
        console.log(req.user);
        db.query('INSERT INTO BOOKING (booking_id,user_id,match_id,seat_total,merch_total,food_total) VALUES(?,?,?,?,?,?)', [req.body.booking_id, req.user.user.user_id, req.body.match_id,seat_total,merch_total,food_total], function (err, results, fields) {
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

class Booking_details
{
    constructor(bookingId,match,seats,food,merch,cost)
    {
        this.bookingId = bookingId;
        this.match = match;
        this.seats = seats;
        this.food = food;
        this.merch = merch;
        this.cost = cost;
    }
}

router.get('/getBookings', authenticate, (req, res) => {
    db.query('SELECT booking_id FROM booking WHERE user_id=?', [req.user.user.user_id], function(err, results) {
        var bookings = [];
        if(results.length==0)
        {
            res.json("No Bookings Done By User")
        }
        for (let i = 0; i < results.length; i++)
        {
            let bookingId = results[i].booking_id;
            // console.log(results[i].booking_id);
            db.query('SELECT match_id FROM booking WHERE booking_id=?', [bookingId], function(err1, results1) {
                let matchId = results1[0].match_id;
                
                // console.log(matchId)
                db.query('SELECT * FROM new_schema.match WHERE match_id=? and date_time>now()', [matchId], function(err2, match) {
                    db.query('SELECT s.seat_id,s.seat_type,s.seat_price FROM book_seats b, seats s WHERE b.booking_id=? and s.seat_id = b.seat_id and s.stadium_id = ?',[bookingId,match[0].stadium_id],function(err,seats)
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        db.query('SELECT f.food_id,f.food_name, b.quantity,f.food_price FROM booking_food b, food_item f WHERE b.booking_id=? and f.food_id = b.food_id',[bookingId],function(err,foods)
                        {
                            db.query('SELECT m.merch_id,m.merch_name,m.merch_price, b.quantity   FROM booking_merch b, merch m WHERE b.booking_id=? and m.merch_id = b.merch_id',[bookingId],function(err,merch)
                            {
                                let cost = 0
                                console.log(seats);
                                console.log(foods);
                                for(let i = 0 ; i < seats.length ; i++) {
                                    cost += seats[i].seat_price;
                                }
                                for(let i = 0 ; i < foods.length ; i++) {
                                    cost += foods[i].food_price*foods[i].quantity;
                                }
                                for(let i = 0 ; i < merch.length ; i++) {
                                    cost += merch[i].merch_price*merch[i].quantity;
                                }
                                bookings.push((new Booking_details(bookingId,match,(seats),(foods),(merch),(cost))));
                                // console.log(JSON.stringify(bookings[i])+"\n\n");
                                // bookings.push(1);
                                if(i==results.length-1)
                                {
                                    res.json(bookings);
                                    // console.log(booking)
                                    return;
                                }
                            });
                        });
                    });
                });
            })
        }
    });
});

router.get('/deletebooking/:booking_id',authenticate, function(req,res)
{
    db.query('DELETE FROM booking WHERE booking_id=?', [req.params.booking_id], function(err, results) {
        if(err){
            res.status(422).json({
                message:err.message
            });
            return;
        }
        res.json(results);
    }); 
});

router.post('/updateBooking', authenticate, (req, res) => {
    db.query('DELETE FROM book_seats WHERE booking_id=?', [req.body.booking_id], function(err, results) {
        if(err){
            res.status(422).json({
                message:err.message
            });
            return;
        }
        db.query('SELECT seat_total FROM booking WHERE booking_id=?', [req.body.booking_id],function(err,prev_seat_total,fields)
        {
            if(err){
                res.status(422).json({
                    message:err.message
                });
                return;
            }
            // let prev = prev_seat_total;
            let seatTotal = 0;
            for (let i = 0; i < req.body.seats.length; i++)
            {
                bookseats(req.body.booking_id, req.body.seats[i].seat_id);
                seatTotal+=req.body.seats[i].seat_price;
            }
            db.query('UPDATE user SET balance = balance - ? WHERE user_id=?',[seatTotal-prev_seat_total[0].seat_total, req.user.user.user_id], function(err, results) {
                // console.log(prev_seat_total[0].seat_total);
                if(err){
                    // console.log(err.message);
                    res.status(422).json({
                        message:err.message
                    });
                    return;
                } 
                db.query('UPDATE booking SET seat_total=? WHERE booking_id=?', [seatTotal, req.body.booking_id], function(err, results) {
                    if(err){
                        res.status(422).json({
                            message:err.message
                        });
                        return;
                    }
                    res.json("Changed");    
                })
            });
        });
    });
});

router.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = req.body.amount;
    console.log(amount);
	const currency = 'INR'
	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

router.post('/getBookMerch', authenticate, (req, res) => {
    db.query('SELECT * FROM booking_merch WHERE booking_id=?', [req.body.booking_id], (err, results) => {
        if(err){
            console.log(err.message);
            res.status(422).json({
                message:err.message
            });
            return;
        }
    })
})

router.post('/getBookFood', authenticate, (req, res) => {
    db.query('SELECT * FROM booking_food WHERE booking_id=?', [req.body.booking_id], (err, results) => {
        if(err){
            console.log(err.message);
            res.status(422).json({
                message:err.message
            });
            return;
        }
    })
})

module.exports = router;