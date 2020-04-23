const Sequelize = require("sequelize");
const sequelize = require("./../utils/dbconnection");

const todo = sequelize.define("Todo", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  done: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = todo;
