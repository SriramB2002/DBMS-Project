//Sequalize Connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('new_schema_2', 'root', 'Yash@2002');
const User = sequelize.define('user',{
    user_id: {type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
});
module.exports = sequelize;

