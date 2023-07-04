import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const DefenceLine = db.define('defenceLine_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Функциональный блок'
        },
    // comment: 'Функциональный блок',
    }, {
        freezeTableName: true
    }
);
export default DefenceLine
