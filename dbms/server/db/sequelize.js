//Sequalize Connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('new_schema', 'root', 'admin');
const User = sequelize.define('user',{
    user_id: {type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
});
module.exports = sequelize;

