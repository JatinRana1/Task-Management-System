const sequelize = require("../connection/connection");
const { DataTypes } = require('sequelize');
// Define Curd model
const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  module.exports = Task