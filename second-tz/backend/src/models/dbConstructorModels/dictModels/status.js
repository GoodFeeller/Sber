import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const status = db.define('status_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: "статус"

        },
    }, {
        freezeTableName: true
    }
);

export default status
