const express = require("express");
const app = express();
const router = express.Router();
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
app.use(express.urlencoded());
app.use(express.json());
const securePassword = (password) => {
  const passwordHashed = bcrypt.hashSync(password, 10);
  return passwordHashed;
};
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    return res.status(404).send("Access denied");
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(404).send("Access denied");
    }
    req.user = user;
    next();
  });
}
router.post("/register", (req, res) => {
  //Express Validator
  //BCrpyt
  const password = securePassword(req.body.password);
  console.log("This is " + password);
  //DB
  db.query(
    "INSERT INTO ADMIN  (username,password) VALUES (?,?)",
    [req.body.username, password],
    function (err, results, fields) {
      if (err) {
        res.status(422).json({
          message: err.message,
        });
        return;
      }
      db.query("SELECT * FROM USER", function (err, results, fields) {
        res.json({
          message: "Register Successful",
        });
      });
    }
  );
});
router.post("/login", (req, res) => {
  console.log(req.body);
  db.query(
    "SELECT * FROM ADMIN WHERE username=?",
    [req.body.username],
    function (err, results, fields) {
      if (results.length == 0 || results === null || results === undefined) {
        res.status(404).json({
          message: "User Doesn't Exist",
        });
        return;
      }
      bcrypt.compare(
        req.body.password,
        results[0].password,
        function (err, result) {
          if (result) {
            console.log(results[0]);
            // return;
            req.token = jwt.sign({ user: results[0] }, process.env.SECRET_KEY);
            res.json(req.token);
            console.log(req.token);
          } else {
            res.status(404).send("Please Enter Correct Password");
          }
        }
      );
    }
  );
});
// router.post('/login',(req,res)=>{
//     db.query('SELECT * FROM ADMIN WHERE username=? AND password=?',[req.body.username,req.body.password],function(err,results,fields){
//         res.json({user:results[0]});
//     });
// });
//Adds Teams to Database
router.post(
  "/addteams",
  /*authenticate,*/ (req, res) => {
    db.query(
      "INSERT INTO TEAMS (team_id,team_name,team_flag) VALUES (?,?,?)",
      [req.body.team_id, req.body.team_name, req.body.team_flag],
      function (err, results, fields) {
        if (err) {
          res.status(422).json({
            message: err.message,
          });
          return;
        }
        res.json("Added");
      }
    );
  }
);

function addSeats(stadium_id, normal_price, premium_price, capacity) {
  let n = 1;
  while (n <= capacity) {
    for (let i = 1; i <= 45; i++) {
      db.query(
        "INSERT INTO SEATS (seat_id,stadium_id,seat_type,seat_price) VALUES (?,?,?,?)",
        [n, stadium_id, "Premium", premium_price]
      );
      n++;
    }
    for (let i = 1; i <= 105; i++) {
      db.query(
        "INSERT INTO SEATS (seat_id,stadium_id,seat_type,seat_price) VALUES (?,?,?,?)",
        [n, stadium_id, "Normal", normal_price]
      );
      n++;
    }
  }
}

//Add Stadium to database
router.post(
  "/addstadium",
  /*authenticate,*/ (req, res) => {
    db.query(
      "INSERT INTO STADIUM (stadium_id,stadium_name,capacity,city,country) VALUES (?,?,?,?,?)",
      [
        req.body.stadium_id,
        req.body.stadium_name,
        req.body.capacity,
        req.body.city,
        req.body.country,
      ],
      function (err, results, fields) {
        if (err) {
          res.status(422).json({
            message: err.message,
          });
          return;
        }
        // console.log(results);
        db.query(
          "select stadium_id from stadium where stadium_name=?",
          [req.body.stadium_name],
          function (err, results, fields) {
            if (err) {
              res.status(422).json({
                message: err.message,
              });
              return;
              // throw err;
            }
            console.log(results[0].stadium_id);
            addSeats(
              results[0].stadium_id,
              req.body.normal_price,
              req.body.premium_price,
              req.body.capacity
            );
            // res.json("added");
          }
        );
        res.json("added");
      }
    );
  }
);

//Adds match to database
router.post(
  "/match",
  /*authenticate,*/ (req, res) => {
    if (req.body.team1_id == req.body.team2_id) {
      res.status(400).json("Team id cannot be equal");
      return;
    }
    db.query(
      "INSERT INTO new_schema.MATCH (match_id, match_format, match_type, date_time, stadium_id, team1_id, team2_id) VALUES (?,?,?,?,?,?,?);",
      [
        req.body.match_id,
        req.body.match_format,
        req.body.match_type,
        req.body.date_time,
        req.body.stadium_id,
        req.body.team1_id,
        req.body.team2_id,
      ],
      function (err, results, fields) {
        if (err) {
          res.status(422).json({
            message: err.message,
          });
          return;
        }
        res.json("Success");
      }
    );
  }
);

//Add food item
router.post(
  "/addfood",
  /*authenticate,*/ (req, res) => {
    db.query(
      "INSERT INTO FOOD_ITEM (food_id,food_name,food_price,food_image) values(?,?,?,?)",
      [
        req.body.food_id,
        req.body.food_name,
        req.body.food_price,
        req.body.food_image,
      ],
      function (err, results, fields) {
        if (err) {
          res.status(422).json({
            message: err.message,
          });
          return;
        }
        res.json("Success");
      }
    );
  }
);

router.post(
  "/updatefood",
  /*authenticate,*/ (req, res) => {
    db.query(
      "UPDATE food_item SET food_price = ? WHERE food_id = ?",
      [req.body.newprice, req.body.food_id],
      function (err, results, fiels) {
        if (err) {
          res.status(422).json({
            message: err.message,
          });
          return;
        }
        res.json("Success");
      }
    );
  }
);

router.post(
  "/addmerch",
  /*authenticate,*/ (req, res) => {
    db.query(
      "INSERT INTO MERCH (merch_id,merch_name,merch_image,merch_price) values(?,?,?,?)",
      [
        req.body.merch_id,
        req.body.merch_name,
        req.body.merch_image,
        req.body.merch_price,
      ],
      function (err, results, fields) {
        if (err) {
          res.status(422).json({
            message: err.message,
          });
          return;
        }
        res.json("Success");
      }
    );
  }
);

router.post(
  "/updatemerch",
  /*authenticate,*/ (req, res) => {
    db.query(
      "UPDATE merch SET merch_price = ? WHERE merch_id = ?",
      [req.body.newprice, req.body.merch_id],
      function (err, results, fiels) {
        if (err) {
          res.status(422).json({
            message: err.message,
          });
          return;
        }
        res.json("Success");
      }
    );
  }
);

router.post("/deletemerch", (req, res) => {
  db.query(
    "DELETE FROM merch WHERE merch_id=?",
    [req.body.merch_id],
    (err, results) => {
      res.json(results);
    }
  );
});

router.post("/deletefood", (req, res) => {
  db.query(
    "DELETE FROM food_item WHERE food_id=?",
    [req.body.food_id],
    (err, results) => {
      res.json(results);
    }
  );
});

module.exports = router;
