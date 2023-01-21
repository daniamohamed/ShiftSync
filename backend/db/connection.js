// import required module
const Sequelize = require("sequelize");

// new sequelize instance with the specified database name, username, and password
const sequelize = new Sequelize("jobs", "postgres", "sc20dm", {
   host: "localhost",
   port: 5432,
   dialect: "postgres",
   logging: false, // disable logging of SQL queries to console
});

module.exports = sequelize;