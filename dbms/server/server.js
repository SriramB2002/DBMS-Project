const express = require('express');
const db = require('./db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRoutes = require('./routes/login');
const adminLoginRoutes = require('./admin/adminroutes');
const adminGetRoutes = require('./admin/getroutes');
const userbooking = require('./user/userbooking');
const userprofile = require('./user/userprofile');
var cors = require('cors');
// const sequelize = require('./db/sequelize');
const app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(express.urlencoded());
app.use(express.json());
app.use(loginRoutes);
app.use('/user/booking', userbooking);
app.use('/user/profile', userprofile);
app.use('/admin',adminLoginRoutes);
app.use('/get',adminGetRoutes);
app.get('/users',(req,res)=>{
    res.json("Hello");
});
app.post('/add-user',(req,res)=>{
   res.redirect('/users');
});
app.listen(8080);
