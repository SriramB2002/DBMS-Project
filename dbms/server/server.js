const express = require('express');
const db = require('./db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRoutes = require('./routes/login');
const adminLoginRoutes = require('./admin/adminroutes');
const adminGetRoutes = require('./admin/getroutes');
// const sequelize = require('./db/sequelize');
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(loginRoutes);
app.use('/admin',adminLoginRoutes);
app.use('/get',adminGetRoutes);
app.get('/users',(req,res)=>{
    res.json("Hello");
});
app.post('/add-user',(req,res)=>{
   res.redirect('/users');
});
app.listen(8080);
