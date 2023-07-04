import Sequelize from 'sequelize'
const sequelize = new Sequelize("tz1", "postgres", "1111", {
  dialect: "postgres",
  host: "localhost"
});
export default sequelize;
