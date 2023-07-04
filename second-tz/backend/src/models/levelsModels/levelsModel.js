import Sequelize from "sequelize"
import db from './../../config/LevelsDB.js'

const item = db.define("item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  level_1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  level_2: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  level_3: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  level_4: {
    type: Sequelize.STRING,
    allowNull: true,
  }
})
export default item
