const { Sequelize } = require("sequelize");
require("dotenv").config();
const { DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

// Sequelize connection
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

module.exports = sequelize;
