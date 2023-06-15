const Sequelize = require("sequelize");
module.exports = sequelize = new Sequelize("tz1", "postgres", "1111", {
    dialect: "postgres",
    host: "localhost"
});
