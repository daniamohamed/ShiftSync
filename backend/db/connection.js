// import required module
const Sequelize = require("sequelize");

// new sequelize instance with the specified database name, username, and password
// if database not created use psql postgres to create one
const sequelize = new Sequelize("jobs", "postgres", "sc20dm", {
   host: "localhost",
   port: 5432,
   dialect: "postgres",
   logging: false,
});

module.exports = sequelize;