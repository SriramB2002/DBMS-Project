//Pure SQL Connection 
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dbs',
    password:'admin'
});
db.connect((err)=>{
    if(err) throw err;
    console.log("Connected to database");
}
);
module.exports = db;
