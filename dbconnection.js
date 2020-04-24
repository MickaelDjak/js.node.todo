const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_todo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
